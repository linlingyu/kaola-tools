void function(){
    var util = {
        defineProperties: function(obj, methods, options){
            var c = {}, item;
            for(var i in methods){
                item = c[i] = {value: methods[i]};
                if(options){
                    for(var j in options[i]){
                        item[j] = options[i][j];
                    }
                }
            }
            Object.defineProperties(obj, c);
        }
    }
    

    function Comment(options){
        var self = this;
        self._datas = {
            areaId: 'file-' + options.areaId,
            areaName: decodeURI(options.areaName),
            productName: $('dt.product-title').text(),
            medium: [],
            bad: []
        }
    }
    util.defineProperties(Comment.prototype, {
        collect: function(type, callback){
            var self = this;

            function recursion(){
                setTimeout(function(){
                    // 收集程序
                    self.pick(type);
                    // 点下一页
                    var $pagebox = $('#pageBox'),
                        $nextpage;
                    if($pagebox.css('display') === 'none'){
                        callback();
                        return;
                    }else{
                        $nextpage = $('#pageBox>a.nextPage');
                        if($nextpage.length > 0){
                            $nextpage.get(0).click();//点击下一页
                            recursion();
                        }else{
                            callback();
                        }
                    }

                }, 1024);
            }
            recursion();
        },

        pick: function(type){
            var self = this,
                array = self._datas[type];
            $('div.commWrap>dl.eachInfo').each(function(index, item){
                var $item = $(item);
                array.push({
                    name: $item.find('dt.c_666').text(),
                    origin: $item.find('ul.commItem>li.c_666').eq(0).text(),
                    answer: $item.find('ul.commItem>li.replyLi').text()
                });
            });
        },

        getData: function(){
            return this._datas;
        }
    });



























    window._component_ = {
        Comment: Comment
    };
}();