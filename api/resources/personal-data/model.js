const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    staffMemberId   : {type: String},
    gender          : {type: String},
    birthDate       : {type: Date},
    nationality     : {type: String}

});

mongoose.model('PersonalData', schema);
