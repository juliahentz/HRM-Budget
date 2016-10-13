const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    positionsFilled: [
        {
            category            : {type: String},
            grade               : {type: Number},
            step                : {type: Number},
            startDate           : {type: Date},
            endDate             : {type: Date},
            headOfUnit          : {type: Boolean},
            placeOfEmployment   : {type: String},
            basicSalary         : {type: Number},
            headOfUnitTop       : {type: Number},
            adjustedBasicSalary : {type: Number}
        }
    ]

});

mongoose.model('StepByStep', schema);
