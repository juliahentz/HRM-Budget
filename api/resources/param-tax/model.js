const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    specialLevy : {type: Number},
    pension     : {type: Number},
    sickness    : {type: Number},
    accident    : {type: Number},
    unemployment: {type: Number}

});

mongoose.model('ParamTax', schema);
