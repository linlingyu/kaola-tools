requirejs(['jquery'], function($){
    var windowId;
    function getWindowId(callback){
        if(windowId){return callback();}
        chrome.windows.getCurrent(null, function(win){
            windowId = win.id;
            callback();
        });
    }
    //
    $('.app-menu .item').click(function(evt){
        var typeId = this.id;
        chrome.runtime.getBackgroundPage(function(win){
            win.app.run();
            window.close();
        });
    });
});