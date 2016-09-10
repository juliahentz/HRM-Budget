const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    categoryName: {type: String},
    grades      : {type: mongoose.Schema.Types.ObjectId, ref: 'ParamContractGrade'}

});

mongoose.model('ParamContactCategory', schema);
