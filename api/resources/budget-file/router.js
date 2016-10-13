'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');

exports.init = (app)=> {

    app.get('/api/budget-files', (req, res)=> {

        const BudgetFile = mongoose.model('BudgetFile');

        BudgetFile.find((err, budgetFileDoc)=> {
            if (!err) {
                res.send(budgetFileDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/budget-file/:id', (req, res)=> {
        
        const budgetFileId = req.params.id;

        const BudgetFile = mongoose.model('BudgetFile');

        BudgetFile.findById({_id: budgetFileId}, (err, budgetFileDoc)=> {

            if (!err) {
                res.send(budgetFileDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/budget-file/:id', (req, res)=> {

        const budgetFileData = req.body;
        const budgetFileId = req.params.id;

        const BudgetFile = mongoose.model('BudgetFile');

        BudgetFile.findByIdAndUpdate(budgetFileId, budgetFileData, {'new': true}, (err, budgetFileDoc)=> {

            if (!err) {
                res.send(budgetFileDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });


};