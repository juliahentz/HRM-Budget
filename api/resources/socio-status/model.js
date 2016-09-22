const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange        : {type: Date},
    maritalStatus       : {type: String},
    marriageStartDate   : {type: Date},
    numChildren         : {type: Number},
    numDependentChildren: {type: Number},
    fullTimePercentage  : {type: Number}


});

mongoose.model('SocioStatus', schema);
