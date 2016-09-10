const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    name    : {type: String},
    category: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'ParamContactCategory'}
    ]

});

mongoose.model('ParamContractType', schema);
