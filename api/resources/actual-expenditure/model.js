const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    month: {type: Number},
    year: {type: Number},
    basicSalarySum: {type: Number},
    headOfUnit: {type: Number},
    parentalLeave: {type: Number},
    householdAllowance: {type: Number},
    dependentChildAllowance: {type: Number},
    educationAllowance: {type: Number},
    expatriationAllowance: {type: Number}
    
});

mongoose.model('ActualExpenditure', schema);
