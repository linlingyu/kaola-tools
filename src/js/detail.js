void function(){
    var util = {
        parameters: function(search){
            var params = search.split('?')[1],
                ret = {};
            if(!params){return;}
            params = params.split('&');
            params.forEach(function(item){
                item = item.split('=');
                ret[item[0]] = item[1];
            });
            return ret;
        },
        joinToParams: function(url, source){
            var params = [];
            for(var i in source){
                params.push(i + '=' + source[i]);
            }
            url += (~url.indexOf('?') ? '&' : '?') + params.join('&');
            return url;
        }
    }
    //如果是大专区页
    if(~location.search.indexOf('navindex')){
        var areaName = $('#funcTab>li.active>a').text(),
            areaId = util.parameters(location.search)['navindex'],
            array = [],
            $mark = $('<div class="kaola-mark"></div>'),
            $wrapper = $('<div class="wrapper"></div>'),
            $progress = $('<progress value="0" max="100"></progress>'),
            app = {
                next: function(){
                    var link = array.shift(),
                        max = $progress.prop('max');
                    $progress.prop('value', max - array.length);
                    if(link){
                        link.href = encodeURI(util.joinToParams(link.href, {areaName: areaName, areaId: areaId}));
                        link.click();
                    }else{
                        alert('--complete--');
                    }
                }
            };
        $(document.body).append($mark);
        $mark.append($wrapper);
        $wrapper.append($progress);
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            if(request.type === 'kaola:click:collect'){
                $('li.pro-item>a').each(function(){
                    array.push(this);
                });
                // array = array.slice(0, 2);
                $progress.prop('max', array.length);//设置进度条最大值
                app.next();
            }

            if(request.type === 'kaola:send:next'){
                app.next();
            }
            
        });
    }

    //如果是detail页
    if(~location.href.indexOf('product')){
        var params = util.parameters(location.search),
            comment = new window._component_.Comment(params),
            $form = $('<form name="myform" method="post" action="http://localhost:3000/kaola"><input name="datas" type="hidden"/></form>');
        $(document.body).append($form);
        $.Deferred(function(dtd){
            // document.body.scrollTop = 816;
            setTimeout(function(){
                $('#userRating_T').get(0).click();
                dtd.resolve();
            }, 128);
        }).then(function(){
            var dtd = $.Deferred();
            setTimeout(function(){
                $('#commentSelect3').click();//点击中评
                dtd.resolve();
            }, 128);
            return dtd.promise();
        }).then(function(){
            var dtd = $.Deferred();
            comment.collect('medium', function(){//收集中评信息
                dtd.resolve();
            });
            return dtd.promise();
        }).then(function(){
            var dtd = $.Deferred();
            setTimeout(function(){
                $('#commentSelect4').click();//点击差评
                dtd.resolve();
            }, 128);
            return dtd.promise();
        }).then(function(){
            var dtd = $.Deferred();
            comment.collect('bad', function(){// 收集差评信息
                dtd.resolve();
            });
            return dtd.promise();
        }).then(function(){
            //发送数据到background
            var datas = JSON.stringify(comment.getData());
            $form.find('input').val(datas);
            $form.get(0).submit();
        });
    }

    if(~location.href.indexOf('localhost:3000/kaola')){
        chrome.runtime.sendMessage(null, {type: 'kaola:detail:next'}, function(response){});
    }

}();