var express = require('express');
var router = express.Router();
//mongo db and model
var mongoose = require('mongoose'), Person = mongoose.model('Person');
/* GET users listing. */
router.get('/user', function (req, res) {
    Person.findOne({'_id' : '5420ba3b57987c966e4da91d'}, function (err, doc) {
        res.json(doc);
    })
});

module.exports = router;
