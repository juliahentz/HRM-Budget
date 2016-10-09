const mongoose = require('mongoose');

const schema = new mongoose.Schema({

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
    childrenUnderSix: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    childrenInUni: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    childrenInUniExpatAndFar: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    parentalLeave: [
        {
            status      : {type: Boolean},
            increase    : {type: Boolean},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    parentalLeaveExtension: [
        {
            status      : {type: Boolean},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    parentalLeaveIncrease: [
        {
            status      : {type: Boolean},
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
    ],
    parttimePensionContr: [
        {
            status      : {type: Boolean},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ]

});

mongoose.model('SocioStatus', schema);
