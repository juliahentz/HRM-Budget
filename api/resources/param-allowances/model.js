const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    correctionCoefficient   : {type: Number},
    expatriationAllowance   : {type: Number},
    householdAllowance      : {type: Number},
    childrenAllowance       : {type: Number},
    schoolAllowance         : {type: Number}

});

mongoose.model('ParamAllowances', schema);
