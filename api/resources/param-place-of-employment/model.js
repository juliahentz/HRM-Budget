const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    place                   : {type:String},
    correctionCoefficient   : {type:Number}

});

mongoose.model('ParamPlaceOfEmployment', schema);
