const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    type: {type: String},
    grade: {type: Number},
    step: {type: Number},
    salary: {type: Number}

});

mongoose.model('ParamSalary', schema);
