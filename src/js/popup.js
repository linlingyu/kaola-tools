requirejs(['jquery'], function($){
    var windowId;
    function getWindowId(callback){
        if(windowId){return callback();}
        chrome.windows.getCurrent(null, function(win){
            windowId = win.id;
            callback();
        });
    }
    $('.app-menu .item').click(function(evt){
        chrome.runtime.getBackgroundPage(function(win){
            getWindowId(function(){
                win.app.run(windowId);
                window.close();
            });
        });
    });
});