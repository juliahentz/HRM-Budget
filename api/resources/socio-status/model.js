const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange    : {type: Date},
    maritalStatus   : [
        {
            status      : {type: String},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    numChildren     : [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    fullTimePercentage: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ]

});

mongoose.model('SocioStatus', schema);
