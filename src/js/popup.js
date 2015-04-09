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
        var typeId = this.id;
        chrome.runtime.getBackgroundPage(function(win){
            getWindowId(function(){
                var App = win.app,
                    porp = typeId === 'exeId' ? 'run' : 'open';
                if(typeId === 'optId'){
                    App.open(windowId);
                }else{
                    App.run(windowId, typeId);
                }
                window.close();
            });
        });
    });
});