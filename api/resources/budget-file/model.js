const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    contractTyoe: {type: String},
    year: {type: Number},
    month: {type: Number},
    fullMonth: {type: Boolean},
    salaryScale: {type: Number},
    partTimeAdjustedSalary: {type: Number},
    managementAllowance: {type: Number},
    TBAincrease: {type: Number},
    parentalLeave: {type: Number},
    householdAllowance: {type: Number},
    dependentChildAllowance: {type: Number},
    educationAllowance: {type: Number},
    expatriationAllowance: {type: Number},
    correctionCoefficientDeduction: {type: Number},
    pensionContribution: {type: Number},
    sicknessInsuranceContribution: {type: Number},
    accidentInsuranceContribution: {type: Number},
    complementarySicknessInsurance: {type: Number},
    dependantAccidentInsurance: {type: Number},
    allowanceForLivingConditions: {type: Number},
    allowanceForDifficultLivingConditions: {type: Number},
    tax: {type: Number},
    secretarialAllowance: {type: Number},
    flatRateOvertime: {type: Number},
    unemploymentInsuranceContribution: {type: Number},
    otherPayments: {type: Number},
    otherDeductions: {type: Number},
    correctionCoefficientOthers: {type: Number},
    specialLevy: {type: Number}

});

mongoose.model('BudgetFile', schema);
