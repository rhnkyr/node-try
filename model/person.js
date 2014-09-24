var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    firstname : String,
    lastname  : String,
    email     : String
});

var Person = module.exports = mongoose.model('Person', personSchema, 'person');