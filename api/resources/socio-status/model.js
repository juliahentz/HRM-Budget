const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange        : {type: Date, required: true},
    staffMemberId       : {type: String, required: true},
    maritalStatus       : {type: String, required: true},
    marriageStartDate   : {type: Date},
    numChildren         : {type: Number, required: true},
    numDependentChildren: {type: Number, required: true}


});

mongoose.model('SocioStatus', schema);
