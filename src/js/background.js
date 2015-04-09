requirejs(['jquery', 'modules/FileHelper'], function($, fileHelper){
    var tabId = 0,
        windowId = 0,
        app = window.app = {
            run: function(winId){
                windowId = winId;
                chrome.tabs.getSelected(winId, function(tab){
                    // 向内容页发送消息
                    chrome.tabs.sendMessage(tabId = tab.id, {
                        type: 'kaola:click:collect'
                    }, function(response){});
                });
            },

            open: function(){
                var url = chrome.extension.getURL('src/options.html');
                chrome.tabs.create({url: url}, function(tab){});
            }
        };
    
    // 接收页面的事件
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(msg.type === 'kaola:detail:next'){
            $.Deferred(function(dtd){
                chrome.tabs.getSelected(windowId, function(tab){
                    dtd.resolve(tab.id);
                });
            }).then(function(tabId){
                var dtd = $.Deferred();
                chrome.tabs.remove(tabId, function(){
                    dtd.resolve();
                });
                return dtd.promise();
            }).then(function(){
                // 向内容页发送消息
                chrome.tabs.sendMessage(tabId, {
                    type: 'kaola:send:next'
                }, function(response){});
            });
        }

        if(msg.type === 'kaola:detail:savedata'){
            var product = JSON.parse(msg.datas),
                filePath = '/kaola/' + product.areaId;
            $.Deferred(function(dtd){
                fileHelper.read(filePath, {success: function(txt){
                    dtd.resolve(txt);
                }});
            }).then(function(txt){
                var dtd = $.Deferred();
                if(txt){
                    dtd.resolve();
                }else{
                    fileHelper.write(filePath, msg.datas, {encoding: 'utf-8', success: function(){
                        dtd.resolve();
                    }});
                }
                return dtd.promise();
            }).then(function(){
                sendResponse({error: null});
            });
        }
    });
});