// DON'T FORGET TO ADD REQUIRE STATEMENTS IN THE INDEX.js FILE

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    dateCreated : { type : Date, default : Date.now }

});

mongoose.model('Sample', schema);
