var express = require('express');
var router = express.Router();
var fileSaver = require('../core/FileSaver').getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/kaola', function(req, res, next){
    var params = req.body;
    fileSaver.save(params.datas);
    res.json({error: null});
});

module.exports = router;
