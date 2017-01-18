const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateInterval            : {type: mongoose.Schema.Types.ObjectId, ref: 'DateInterval'},
    numChildren             : {type: Number},
    childrenUnderSix        : {type: Number},
    childrenInUni           : {type: Number},
    childrenInUniExpatAndFar: {type: Number},
    parentalLeave           : {type: Boolean},
    parentalLeaveExtension  : {type: Boolean},
    parentalLeaveIncrease   : {type: Boolean},
    fullTimePercentage      : {type: Number},
    parttimePensionContr    : {type: Boolean}
});

mongoose.model('SocioStatus', schema);
