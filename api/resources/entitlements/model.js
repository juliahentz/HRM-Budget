const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateInterval                : {type: mongoose.Schema.Types.ObjectId, ref: 'DateInterval'},
    householdAllowance          : {type: Boolean},
    expatriationAllowance       : {type: Number},
    flatRateOvertime            : {type: Boolean},
    nonFlatrateSchoolAllowance  : {type: Boolean},
    deductions                  : {type: Number},
    placeOfOriginDistance       : {type: Number},
    placeOfOriginNumOfTravellers: {type: Number}

});

mongoose.model('Entitlements', schema);
