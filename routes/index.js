var express = require('express');
var router = express.Router();

const user = require('./User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 통신 테스트
router.get('/health/check', function (req, res) {
  res
    .json({ message: 'ok' });
});

router.use('/user', user);

module.exports = router;