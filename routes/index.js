var express = require('express');
var router = express.Router();

/* GET home page...*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RECUPERATORIO DE SEMINARIO DE SISTEMAS' });
});

module.exports = router;
