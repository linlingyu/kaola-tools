void function(){
    var fs = require('fs'),
        path = require('path'),
        util = require('util'),
        array = '1,2,3,4,5'.split(',');

    array.forEach(function(item){
        var filePath = path.join(__dirname, 'file-' + item),
            outputPath = path.join(__dirname, 'output-' + item),
            content = fs.readFileSync(filePath).toString(),
            products = JSON.parse(content);
        // 
        var tpl_class = util.format('大类：%s\r\n%s', products.areaName),
            productArray = [];
        products.products.forEach(function(product){
            var tpl_product = '   产品：%s\r\n   中评：\r\n%s\r\n   差评：\r\n%s',
                tpl_comment = '       用户ID：%s\r\n       评  语：%s\r\n       %s',
                mediumArray = [],
                badArray = [];
            tpl_product = util.format(tpl_product, product.productName);

            product.medium.forEach(function(m){
                mediumArray.push(util.format(tpl_comment, m.name, m.origin || '无', m.answer || '客服回复：无'));
            });
            product.bad.forEach(function(b){
                badArray.push(util.format(tpl_comment, b.name, b.origin || '无', b.answer || '客服回复：无'));
            });
            productArray.push(util.format(tpl_product, mediumArray.join('\r\n\r\n'), badArray.join('\r\n\r\n')));
        });

        var content = util.format(tpl_class, productArray.join('\r\n\r\n'));
        fs.writeFileSync(outputPath, content, {encoding: 'utf-8'});
    });
    console.log('--- complete ---');
}();