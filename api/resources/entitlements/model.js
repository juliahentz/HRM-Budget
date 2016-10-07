const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    householdAllowance: [
        {
            status      : {type: Boolean},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    expatriationAllowance: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    flatRateOvertime: [
        {
            status      : {type: Boolean},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    nonFlatrateSchoolAllowance: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ],
    deductions: [
        {
            status      : {type: Number},
            startDate   : {type: Date},
            endDate     : {type: Date}
        }
    ]

});

mongoose.model('Entitlements', schema);
