'use strict'

const mongoose = require('mongoose');
const budgetParser = require('../../budget-parser');

exports.init = (app)=> {

    app.get('/api/annual-budgets', (req, res)=> {

        //const BudgetFile = mongoose.model('BudgetFile');

        /*BudgetFile.remove({}, function(err) {
            console.log('collection removed');

        }).then(function(){
            budgetParser.budgetSave();
            console.log('buget saved');

        }).then(function(){
            setTimeout(function(){
                budgetParser.budgetCalc();
                console.log('budget calc');
            }, 3000);

        });*/

        const AnnualBudget = mongoose.model('AnnualBudget');

        AnnualBudget.find((err, annualBudgetDoc)=> {
            if (!err) {
                res.send(annualBudgetDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/annual-budget', (req, res)=> {

        const AnnualBudget = mongoose.model('AnnualBudget');
        const annualBudget = new AnnualBudget(req.body);

        annualBudget.save((err)=> {

            if (!err) {
                res.send(annualBudget);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/annual-budget/:id', (req, res)=> {

        const annualBudgetData = req.body;
        const annualBudgetId = req.params.id;

        const AnnualBudget = mongoose.model('AnnualBudget');

        AnnualBudget.findByIdAndUpdate(annualBudgetId, annualBudgetData, {'new': true}, (err, annualBudgetDoc)=> {

            if (!err) {
                res.send(annualBudgetDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/annual-budget/:id', (req, res)=> {

        const annualBudgetId = req.params.id;
        const AnnualBudget = mongoose.model('AnnualBudget');

        AnnualBudget.findByIdAndRemove(annualBudgetId, (err, annualBudgetDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });

};