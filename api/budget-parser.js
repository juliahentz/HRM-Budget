'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

const filterYear = 2016;

const monthArray= [1,2,3,4,5,6,7,8,9,10,11,12];

let budgetFile = {};

exports.budgetCalc = ()=> {

    const StaffMember = mongoose.model('StaffMember');
    const PersonalData = mongoose.model('PersonalData');

    StaffMember.find((err, result)=> {

        StaffMember.aggregate([
            {
                "$match": {
                    name: 'Gertrude'
                }
            },
            {
                "$unwind": "$stepByStep"
            },
            {
                "$unwind": "$socioStatus"
            },
            {
                "$unwind": "$entitlements"
            },
            {
                '$lookup':
                    {
                        from: 'personaldatas',
                        localField: 'personalData',
                        foreignField: '_id',
                        as: 'personalDataDocs'
                    }
            },
            {
                '$lookup':
                    {
                        from: 'stepbysteps',
                        localField: 'stepByStep',
                        foreignField: '_id',
                        as: 'stepByStepDocs'
                    }
            },
            {
                '$lookup':
                {
                    from: 'sociostatuses',
                    localField: 'socioStatus',
                    foreignField: '_id',
                    as: 'socioStatusDocs'
                }
            },
            {
                '$lookup':
                {
                    from: 'entitlements',
                    localField: 'entitlements',
                    foreignField: '_id',
                    as: 'entitlementsDocs'
                }
            },
            {
                "$unwind": "$personalDataDocs"
            },
            {
                "$unwind": "$stepByStepDocs"
            },
            {
                "$unwind": "$socioStatusDocs"
            },
            {
                "$unwind": "$entitlementsDocs"
            },
            {
                "$lookup":
                {
                    from: 'dateintervals',
                    localField: 'stepByStepDocs.dateInterval',
                    foreignField: '_id',
                    as: 'stepByStepDateIntervalDocs'
                }
            },
            {
                "$lookup":
                {
                    from: 'dateintervals',
                    localField: 'socioStatusDocs.dateInterval',
                    foreignField: '_id',
                    as: 'socioStatusDateIntervalDocs'
                }
            },
            {
                "$lookup":
                {
                    from: 'dateintervals',
                    localField: 'entitlementsDocs.dateInterval',
                    foreignField: '_id',
                    as: 'entitlementsDateIntervalDocs'
                }
            },
            {
                "$unwind": "$stepByStepDateIntervalDocs"
            },
            {
                "$unwind": "$socioStatusDateIntervalDocs"
            },
            {
                "$unwind": "$entitlementsDateIntervalDocs"
            },
            {
                "$lookup":
                {
                    from: 'paramsalaries',
                    localField: 'salaryId',
                    foreignField: '_id',
                    as: 'salaryFile'
                }
            },
            {
                "$unwind": "$salaryFile"
            },
            {
                "$project":
                {
                    name: "$name",
                    surname: "$surname",
                    staffNumber: "$staffNumber",
                    category: "$stepByStepDocs.category",
                    grade: "$stepByStepDocs.grade",
                    step: "$stepByStepDocs.step",
                    headOfUnit: "$stepByStepDocs.headOfUnit",
                    placeOfEmployment: "$stepByStepDocs.placeOfEmployment",
                    stepByStepDocs: "$stepByStepDocs",
                    entitlementsDocs: "$entitlementsDocs",
                    ContractStepDoc: "$ContractStepDoc",

                    startYear: {$year: "$stepByStepDateIntervalDocs.start"},
                    startDay: {$dayOfMonth: "$stepByStepDateIntervalDocs.start"},
                    startMonth: {$month: "$stepByStepDateIntervalDocs.start"},
                    endYear: {$year: "$stepByStepDateIntervalDocs.end"},
                    endDay: {$dayOfMonth: "$stepByStepDateIntervalDocs.end"},
                    endMonth: {$month: "$stepByStepDateIntervalDocs.end"},

                    startYearSS: {$year: "$socioStatusDateIntervalDocs.start"},
                    startDaySS: {$dayOfMonth: "$socioStatusDateIntervalDocs.start"},
                    startMonthSS: {$month: "$socioStatusDateIntervalDocs.start"},
                    endYearSS: {$year: "$socioStatusDateIntervalDocs.end"},
                    endDaySS: {$dayOfMonth: "$socioStatusDateIntervalDocs.end"},
                    endMonthSS: {$month: "$socioStatusDateIntervalDocs.end"},

                    startYearE: {$year: "$entitlementsDateIntervalDocs.start"},
                    startDayE: {$dayOfMonth: "$entitlementsDateIntervalDocs.start"},
                    startMonthE: {$month: "$entitlementsDateIntervalDocs.start"},
                    endYearE: {$year: "$entitlementsDateIntervalDocs.end"},
                    endDayE: {$dayOfMonth: "$entitlementsDateIntervalDocs.end"},
                    endMonthE: {$month: "$entitlementsDateIntervalDocs.end"}
                }
            }
        ]).exec((err, docs)=> {

            console.log(docs);

            _.each(docs, (d)=>{
                
                budgetFile.contractType = d.category;
                //console.log(budgetFile);

                if(d.startYear <= filterYear && d.endYear >= filterYear){

                    if(d.startYear < filterYear && d.endYear == filterYear){

                        _.each(monthArray, (month)=>{
                            if(d.endMonth <= month){
                                //console.log('first scen');
                            }
                        });
                    }

                    if(d.startYear < filterYear && d.endYear > filterYear){

                        _.each(monthArray, (month)=>{

                            //console.log(d.startYearE);

                            //console.log('second scen');

                        });
                    }

                    if(d.startYear == filterYear && d.endYear == filterYear){

                        _.each(monthArray, (month)=>{

                            if(d.startMonth >= month && d.endMonth <= month){
                                //console.log('third scen');
                            }

                        });
                    }

                    if(d.startYear == filterYear && d.endYear > filterYear){

                        _.each(monthArray, (month)=>{

                            if(d.startMonth >= month){
                                //console.log('fourth scen');
                            }
                        });
                    }
                }
            });

        });
    });

    //month: { $month: "$stepByStepDateIntervalDocs.start" }, day: { $dayOfMonth: "$stepByStepDateIntervalDocs.start" }, year: { $year: "$stepByStepDateIntervalDocs.start" },

    /*query.aggregate([
        { "$match":
            { "personalData.gender": 'Female'
            }
        }
    ]).exec((err, docs)=> {
        console.log(docs);
    });*/

};




/*
exports.budgetCalc = ()=> {

    const BudgetFile = mongoose.model('BudgetFile');

    // todo fix year based on input
    BudgetFile.aggregate([
            {
                $match: {
                    'year': 2016
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month",
                        year: "$year"
                    },
                    salarySum: {$sum: "$basicSalarySum"},
                    headOfUnitSum: {$sum: "$headOfUnit"},
                    count: {$sum: 1}
                }
            }
        ]).exec((err, docs)=> {

            let documents = docs;

            if (!err) {
                const AnnualBudget = mongoose.model('AnnualBudget');

                AnnualBudget.find((e, budgetFind)=>{

                    if(budgetFind.length === 0){

                        let annualBudgetCalFile = {};
                        annualBudgetCalFile.data = [];
                        let monthlyBudgetData = {};

                        _.each(documents, (d)=>{

                            annualBudgetCalFile.year = d._id.year;
                            monthlyBudgetData.month = d._id.month;
                            monthlyBudgetData.salarySum = d.salarySum;
                            monthlyBudgetData.headOfUnitSum = d.headOfUnitSum;

                            annualBudgetCalFile.data.push(monthlyBudgetData);

                        });
                        const AnnualBudget = mongoose.model('AnnualBudget');
                        const annualBudget = new AnnualBudget(annualBudgetCalFile);

                        annualBudget.save((err)=> {

                            if (!err) {
                                //console.log(annualBudget);
                            } else {
                                console.log(err);
                            }
                        });
                    }else{
                        const AnnualBudget = mongoose.model('AnnualBudget');

                        AnnualBudget.remove({}, function(err) {
                            let annualBudgetCalFile = {};
                            annualBudgetCalFile.data = [];
                            _.each(documents, (d)=>{

                                let monthlyBudgetData = {};

                                monthlyBudgetData.month = d._id.month;
                                monthlyBudgetData.salarySum = d.salarySum.toFixed(2);
                                monthlyBudgetData.headOfUnitSum = d.headOfUnitSum.toFixed(2);

                                annualBudgetCalFile.data.push(monthlyBudgetData);
                            });

                            annualBudgetCalFile.year = 2016;

                            //console.log(annualBudgetCalFile);

                            const AnnualBudget = mongoose.model('AnnualBudget');
                            const annualBudget = new AnnualBudget(annualBudgetCalFile);

                            annualBudget.save((err)=> {

                                if (!err) {
                                    //console.log(annualBudget);
                                } else {
                                    console.log(err);
                                }
                            });

                        })
                    }
                });
            } else {
                console.log(err);
            }
        });
};

exports.budgetSave = ()=> {

    const StaffMember = mongoose.model('StaffMember');
    const ParamContractType = mongoose.model('ParamContractType');

    const query = StaffMember.find();

    query.populate('stepByStep socioStatus entitlements');

    query.exec((err, staffMemberDoc)=> {
        if (!err) {

            const contractQeuery = ParamContractType.find();

            contractQeuery.populate({
                path: 'grades',
                populate: {
                    path: 'steps',
                    model: 'ParamContactStep'
                }
            });
            contractQeuery.exec((e, paramContractTypeDoc)=> {
                if (!e) {
                    _.each(staffMemberDoc, (sm)=> {
                        console.log(sm);

                        _.each(sm.stepByStep.positionsFilled, (position)=> {
                            const ParamPlaceOfEmployment = mongoose.model('ParamPlaceOfEmployment');

                            ParamPlaceOfEmployment.find((error, ppoedoc)=> {
                                if (!error) {
                                    _.each(ppoedoc, (doc)=> {
                                        if (doc.place == position.placeOfEmployment) {
                                            let difference = position.endDate.getFullYear() - position.startDate.getFullYear();
                                            for (var i = 0; i <= difference; i++) {

                                                for (var j = 1; j < 13; j++) {

                                                    let currentLoopDate = new Date(position.startDate.getFullYear() + difference, j, position.startDate.getDay());
                                                    if (currentLoopDate > position.startDate && currentLoopDate < position.endDate) {

                                                        _.each(paramContractTypeDoc, (pct)=> {
                                                            if (position.category == pct.name) {
                                                                _.each(pct.grades, (grade)=> {
                                                                    if (position.grade == grade.gradeNumber) {
                                                                        _.each(grade.steps, (step)=> {
                                                                            if (position.step == step.stepNumber) {

                                                                                let newBudgetFile = {};
                                                                                newBudgetFile.basicSalarySum = 0;
                                                                                newBudgetFile.year = 0;
                                                                                newBudgetFile.month = 0;
                                                                                newBudgetFile.headOfUnit = 0;

                                                                                newBudgetFile.basicSalarySum += step.basicSalary * doc.correctionCoefficient / 100;
                                                                                newBudgetFile.year = position.startDate.getFullYear() + i;
                                                                                newBudgetFile.month = j;
                                                                                if (position.headOfUnit) {
                                                                                    newBudgetFile.headOfUnit += step.basicSalary * 4.2021426 / 100;
                                                                                }

                                                                                const BudgetFile = mongoose.model('BudgetFile');

                                                                                const budgetFile = new BudgetFile(newBudgetFile);

                                                                                budgetFile.save((err, docs)=> {
                                                                                    if (!err) {

                                                                                    }
                                                                                });
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }).then(()=>{
                                //budgetCalc();
                            });
                        });
                        _.each(sm.entitlements.entitlements, (entitlement)=>{
                            const AnnualBudget = mongoose.model('AnnualBudget');

                            AnnualBudget.findOne({year: 2016},(err, annualBudgetDoc)=> {
                                if (!err) {

                                    let myCurrentDoc = {};
                                    if(entitlement.householdAllowance){
                                        annualBudgetDoc.householdAllowance = annualBudgetDoc.salarySum * 0.02;
                                        if(annualBudgetDoc.householdAllowance < 176.01){
                                            annualBudgetDoc.householdAllowance = 176.01;
                                        }
                                    }
                                    annualBudgetDoc.expatriationAllowance = annualBudgetDoc.salarySum * entitlement.expatriationAllowance /100;
                                    _.each(annualBudgetDoc.data, (data)=>{
                                        //if(){}
                                    });

                                    //console.log(annualBudgetDoc);
                                    AnnualBudget.findOneAndUpdate(annualBudgetDoc._id, annualBudgetDoc, (err, annualBudgetDocUpdate)=> {
                                        if (!err) {
                                            //console.log(annualBudgetDocUpdate);
                                        } else {
                                            console.log(err);
                                        }
                                    });

                                } else {
                                    console.log(err);
                                }
                            });


                        });
                    });
                } else {
                    console.log(e);
                }
            });
        } else {
            console.log(err);
        }
    });
};*/
