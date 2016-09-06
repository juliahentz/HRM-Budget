const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange    : {type: Date, required: true},
    staffMemberId   : {type: String, required: true},
    country         : {type: String, required: true},
    city            : {type: String, required: true},
    street          : {type: String, required: true},
    houseNum        : {type: String, required: true},
    distance        : {type: Number, required: true},
    numOfTravellers : {type: Number, required: true}

});

mongoose.model('PlaceOfOrigin', schema);
