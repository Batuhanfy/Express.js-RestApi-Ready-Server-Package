var express = require('express');
const config = require('../config');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressBatuhan',config:config });
});

module.exports = router;
