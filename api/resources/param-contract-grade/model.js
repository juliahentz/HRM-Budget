const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    gradeNumber : {type: Number},
    steps       : [
        {type: mongoose.Schema.Types.ObjectId, ref: 'ParamContactStep'}
    ]

});

mongoose.model('ParamContractGrade', schema);
