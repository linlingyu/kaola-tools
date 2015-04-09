var fs = require('fs'),
    path = require('path'),
    fileSaver = {
        save: function(datas){
            var item = JSON.parse(datas),
                filePath = path.join(__dirname, item.areaId),
                origin = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath).toString())
                    : {areaName: item.areaName, products: []};
            origin.products.push(item);
            fs.writeFileSync(filePath, JSON.stringify(origin), {encoding: 'utf-8'});
        }
    };
exports.getInstance = function(){
    return fileSaver;
}