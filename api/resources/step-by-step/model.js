const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange        : {type: Date, required: true},
    staffMemberId       : {type: String, required: true},
    category            : {type: String, required: true},
    grade               : {type: Number, required: true},
    step                : {type: Number, required: true},
    startDateGrade      : {type: Date, required: true},
    endDateGrade        : {type: Date},
    fullTimePercentage  : {type: Number, required:true}

});

mongoose.model('StepByStep', schema);
