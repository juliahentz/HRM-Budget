'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    start: {type: Date},
    end: {type: Date}

});

mongoose.model('DateInterval', schema);
