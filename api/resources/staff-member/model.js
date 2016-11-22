const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated     : {type: Date, default: Date.now},
    name            : {type: String},
    surname         : {type: String},
    staffNumber     : {type: Number},
    dateInterval    : {type: mongoose.Schema.Types.ObjectId, ref: 'DateInterval'},
    personalData    : {type: mongoose.Schema.Types.ObjectId, ref: 'PersonalData'},
    stepByStep      : [{type: mongoose.Schema.Types.ObjectId, ref: 'StepByStep'}],
    socioStatus     : [{type: mongoose.Schema.Types.ObjectId, ref: 'SocioStatus'}],
    entitlements    : [{type: mongoose.Schema.Types.ObjectId, ref: 'Entitlements'}]

});

mongoose.model('StaffMember', schema);
