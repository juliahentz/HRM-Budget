const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateOfChange        : {type: Date, required: true},
    staffMemberId           : {type: String, required: true},
    householdAllowance      : { type: Boolean },
    childAllowance          : { type: Boolean },
    dependentChildAllowance : { type: Boolean },
    expatriationAllowance   : { type: Boolean }

});

mongoose.model('Entitlements', schema);
