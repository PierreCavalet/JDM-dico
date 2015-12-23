var wordController = require('../controllers/word');
var express = require('express');

var router = express.Router();

router.route('/words/:word_id')
    .get(wordController.getWord);

module.exports = router;
