var express = require('express');
var router = express.Router();


var { 
  getDatas,
  pushData,
  del
} = require('../controllers/todoController');

var jsonParser = require('body-parser').json();
//var urlencoded = require('body-parser').urlencoded();
var { getDatas } = require('../controllers/todoController');

/* GET users listing. */
router.get('/get-data',jsonParser, getDatas);
/* pushing data. */
router.post('/push-data',jsonParser, pushData);
/* pushing data. */
router.post('/del-data',jsonParser, del);

module.exports = router;
