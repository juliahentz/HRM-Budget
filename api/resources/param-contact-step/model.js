const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    stepNumber  : {type: Number},
    basicSalary : {type: Number}

});

mongoose.model('ParamContactStep', schema);
