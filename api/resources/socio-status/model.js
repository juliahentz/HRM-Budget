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
            pensionContr: {type: Boolean},
            extension   : {type: Boolean},
            increase    : {type: Boolean},
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
    placeOfOrigin: [
        {
            startDate       : {type: Date},
            endDate         : {type: Date},
            distance        : {type: Number},
            numOfTravellers : {type: Number}
        }
    ],
    placeOfEmployment: [
        {
            startDate       : {type: Date},
            endDate         : {type: Date},
            location        : {type: String}
        }
    ]

});

mongoose.model('SocioStatus', schema);
