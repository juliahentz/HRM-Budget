'use strict'

const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/parameters/salaries', (req, res)=> {

        const ParamSalary = mongoose.model('ParamSalary');

        ParamSalary.find((err, paramSalaryDoc)=> {
            if (!err) {
                res.send(paramSalaryDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/parameters/salary/:id', (req, res)=> {

        const paramSalaryId = req.params.id;

        const ParamSalary = mongoose.model('ParamSalary');

        ParamSalary.findById(paramSalaryId, (err, paramSalaryDoc)=> {

            if (!err) {
                res.send(paramSalaryDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/parameters/salary', (req, res)=> {

        const ParamSalary = mongoose.model('ParamSalary');
        const paramSalary = new ParamSalary(req.body);

        paramSalary.save((err)=> {

            if (!err) {
                res.send(paramSalary);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/parameters/salary/:id', (req, res)=> {

        const paramSalaryData = req.body;
        const paramSalaryId = req.params.id;

        const ParamSalary = mongoose.model('ParamSalary');

        ParamSalary.findByIdAndUpdate(paramSalaryId, paramSalaryData, {'new': true}, (err, paramSalaryDoc)=> {

            if (!err) {
                res.send(paramSalaryDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/parameters/salary/:id', (req, res)=> {

        const paramSalaryId = req.params.id;
        const ParamSalary = mongoose.model('ParamSalary');

        ParamSalary.findByIdAndRemove(paramSalaryId, (err, paramSalaryDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};