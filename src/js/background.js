requirejs(['jquery'], function($){
    var tabId = 0,
        app = window.app = {
            run: function(winId){
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
        if(msg.type !== 'kaola:detail:next'){return;}
        // 向内容页发送消息
        chrome.tabs.sendMessage(tabId = tab.id, {
            type: 'kaola:send:next'
        }, function(response){});
    });
});