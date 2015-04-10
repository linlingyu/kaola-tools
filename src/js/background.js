requirejs(['jquery'], function($){
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
            }
        };
    
    // 接收页面的事件
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
        if(msg.type === 'kaola:detail:next'){
            $.Deferred(function(dtd){
                chrome.tabs.query({url: 'http://localhost:3000/*'}, function(array){
                    dtd.resolve(array);
                });
            }).then(function(array){
                array.forEach(function(tab){
                    chrome.tabs.remove(tab.id);
                });
            }).then(function(){
                // 向内容页发送消息
                chrome.tabs.sendMessage(tabId, {
                    type: 'kaola:send:next'
                }, function(response){});
            });
        }
    });
});