requirejs(['jquery'], function($){
    var app = window.app = {
        run: function(){
            // 向内容页发送消息
            
        }
    };
    //
    
    // chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    //     if(msg.type !== 'neteasy-flush:gotoBasic'){return;}
    //     chrome.tabs.update(sender.tab.id, {url: 'src/collect.html'});
    //     // sendResponse({});
    // });
});