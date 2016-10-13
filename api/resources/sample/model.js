'use strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated: {type: Date, default: Date.now}

});

mongoose.model('Sample', schema);
