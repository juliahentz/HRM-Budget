'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

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
};