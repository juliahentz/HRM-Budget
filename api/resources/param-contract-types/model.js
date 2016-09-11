const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    name    : {type: String},
    grades: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'ParamContractGrade'}
    ]

});

mongoose.model('ParamContractType', schema);
