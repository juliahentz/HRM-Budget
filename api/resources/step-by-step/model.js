const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateInterval        : {type: mongoose.Schema.Types.ObjectId, ref: 'DateInterval'},
    salaryId            : {type: mongoose.Schema.Types.ObjectId, ref: 'ParamSalary'},
    category            : {type: String},
    grade               : {type: Number},
    step                : {type: Number},
    headOfUnit          : {type: Boolean},
    placeOfEmployment   : {type: String}
        
});

mongoose.model('StepByStep', schema);
