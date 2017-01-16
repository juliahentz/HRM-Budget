const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateInterval        : {type: mongoose.Schema.Types.ObjectId, ref: 'DateInterval'},
    category            : {type: String},
    grade               : {type: Number},
    step                : {type: Number},
    headOfUnit          : {type: Boolean},
    placeOfEmployment   : {type: String}
        
});

mongoose.model('StepByStep', schema);
