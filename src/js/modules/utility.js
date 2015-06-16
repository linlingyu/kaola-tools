define(function(require, exports, module){
    module.exports = {
        defineProperties: function(obj, methods, options){
            var c = {}, item, getter, setter;
            for(var i in methods){
                if(!methods.hasOwnProperty(i)){continue;}
                item = c[i] = {};
                getter = methods.__lookupGetter__(i);
                setter = methods.__lookupSetter__(i);
                if (!getter && !setter) {
                    item.value = methods[i];
                } else {
                    getter && (item.get = getter);
                    setter && (item.set = setter);
                }
                if(options){
                    for(var j in options[i]){
                        item[j] = options[i][j];
                    }
                }
            }
            Object.defineProperties(obj, c);
        },

        extend: function(source, copy){
            var getter, setter;
            if(copy){
                for(var i in copy){
                    if (!copy.hasOwnProperty(i)){continue;}
                    getter = copy.__lookupGetter__(i);
                    setter = copy.__lookupSetter__(i);
                    if (!getter && !setter) {
                        source[i] = copy[i];
                    } else {
                        getter && copy.__defineGetter__(i, getter);
                        setter && copy.__defineSetter__(i, setter);
                    }
                }
            }
            return source;
        },

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
        }
    };
});