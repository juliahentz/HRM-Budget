const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated     : {type: Date, default: Date.now},
    name            : {type: String, required: true},
    surname         : {type: String, required: true},
    staffNumber     : {type: Number, required: true},
    personalData    : { type: mongoose.Schema.Types.ObjectId, ref: 'PerosnalData' },
    placeOfOrigin   : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'PlaceOfOrigin' }
    ],
    stepByStep      : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'StepByStep' }
    ],
    socioStatus     : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'SocioStatus' }
    ],
    entitlements    : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Entitlements' }
    ]
    

});

mongoose.model('StaffMember', schema);
