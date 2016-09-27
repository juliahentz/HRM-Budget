const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    positionsFilled: [
        {
            category    : {type: String},
            grade       : {type: Number},
            step        : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ]


});

mongoose.model('StepByStep', schema);
