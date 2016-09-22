const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange        : {type: Date},
    category            : {type: String},
    grade               : {type: Number},
    step                : {type: Number},
    startDateGrade      : {type: Date},
    endDateGrade        : {type: Date}

});

mongoose.model('StepByStep', schema);
