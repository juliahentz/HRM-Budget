const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    statuses: [
        {
            startDate               : {type: Date},
            endDate                 : {type: Date},
            numChildren             : {type: Number},
            childrenUnderSix        : {type: Number},
            childrenInUni           : {type: Number},
            childrenInUniExpatAndFar: {type: Number},
            parentalLeave           : {type: Boolean},
            parentalLeaveExtension  : {type: Boolean},
            parentalLeaveIncrease   : {type: Boolean},
            fullTimePercentage      : {type: Number},
            parttimePensionContr    : {type: Number}
        }
    ]

});

mongoose.model('SocioStatus', schema);
