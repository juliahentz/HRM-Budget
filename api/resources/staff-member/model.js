// DON'T FORGET TO ADD REQUIRE STATEMENTS IN THE INDEX.js FILE

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    dateCreated : {type: Date, default: Date.now},
    name        : {type: String, required: true},
    surname     : {type: String, required: true},
    staffNumber : {type: Number, required: true},
    stepByStep  : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'StepByStep' }
    ],
    entitlements: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Entitlements' }
    ],
    socioStatus : [
        { type: mongoose.Schema.Types.ObjectId, ref: 'SocioStatus' }
    ]

});

mongoose.model('StaffMember', schema);
