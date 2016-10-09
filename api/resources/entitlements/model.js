const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    entitlements: [
        {
            startDate                   : {type: Date},
            endDate                     : {type: Date},
            householdAllowance          : {type: Boolean},
            expatriationAllowance       : {type: Number},
            flatRateOvertime            : {type: Boolean},
            nonFlatrateSchoolAllowance  : {type: Boolean},
            deductions                  : {type: Number},
            placeOfOriginDistance       : {type: Number},
            placeOfOriginNumOfTravellers: {type: Number}
        }
    ]
});

mongoose.model('Entitlements', schema);
