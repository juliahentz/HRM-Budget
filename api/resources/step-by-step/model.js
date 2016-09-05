// DON'T FORGET TO ADD REQUIRE STATEMENTS IN THE INDEX.js FILE

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    SMId        : {type: String, required: true},
    category    : {type: String, required: true},
    grade       : {type: Number, required: true},
    step        : {type: Number, required: true},
    startGrade  : {type: Date, required: true},
    endGrade    : {type: Date}

});

mongoose.model('StepByStep', schema);
