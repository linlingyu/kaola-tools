void function(){
    //如果是大专区页
    if(~location.search.indexOf('navindex')){
        var array = [],
            app = {
                next: function(){
                    var link = array.shift();
                    link && link.click();
                }
            };

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            if(request.type === 'kaola:click:collect'){
                $('li.pro-item>a').each(function(){
                    array.push(this);
                });
                app.next();
            }

            if(request.type === 'kaola:send:next'){
                app.next();
            }
            
        });
        return;
    }

    //如果是detail页
    $(window).on('load', function(){
        $.Deferred(function(dtd){
            setTimeout(function(){
                $('#userRating_T').get(0).click();
                dtd.resolve();
            }, 128);
        }).then(function(){
            var dtd = $.Deferred();
            setTimeout(function(){
                $('#commentSelect3').click();//.prop('checked', true);
                dtd.resolve();
            }, 128);
            return dtd.promise();
        }).then(function(){
            console.log('-3');
        }).then(function(){

        });
    });
}();