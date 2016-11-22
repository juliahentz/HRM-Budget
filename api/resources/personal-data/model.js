const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    gender          : {type: String},
    birthDate       : {type: Date},
    nationality     : {type: String}

});

mongoose.model('PersonalData', schema);
