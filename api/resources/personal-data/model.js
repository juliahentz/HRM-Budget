const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    staffMemberId   : {type: String, required: true},
    gender          : {type: String, required: true},
    birthDate       : {type: Date, required: true},
    nationality     : {type: String, required: true}

});

mongoose.model('PersonalData', schema);
