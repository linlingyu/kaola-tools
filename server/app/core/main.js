void function(){
    var fs = require('fs'),
        path = require('path'),
        array = [1];
    array.forEach(function(item){
        var filePath = path.join(__dirname, 'file-' + item),
            content = fs.readFileSync(filePath).toString(),
            products = JSON.parse(content),
            ret = [];
        ret.push('大类：' + products.areaName);
        products.products.forEach(function(p){
            ret.push('  产品：' + p.productName);
            ret.push('  中评：');
            p.medium.forEach(function(m){
                ret.push('      用户ID：' + m.name);
                ret.push('      评  语：' + m.origin);
                ret.push('     ' + m.answer);
                ret.push(' ');
            });
            ret.push('  差评：');
            p.bad.forEach(function(b){
                ret.push('      用户ID：' + b.name);
                ret.push('      评  语：' + b.origin);
                ret.push('     ' + b.answer);
                ret.push(' ');
            });
            ret.push('\n', '\n');
        });
        console.log(ret.join('\n'));
    });
}();