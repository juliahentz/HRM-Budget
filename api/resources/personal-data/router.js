'use strict'

const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/personal-datas', (req, res)=> {

        const PersonalData = mongoose.model('PersonalData');

        PersonalData.find((err, personalDataDoc)=> {
            if (!err) {
                res.send(personalDataDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/personal-data/:id', (req, res)=> {

        const personalDataId = req.params.id;

        const PersonalData = mongoose.model('PersonalData');

        PersonalData.findById({_id: personalDataId}, (err, personalDataDoc)=> {

            if (!err) {
                res.send(personalDataDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/personal-data', (req, res)=> {

        const PersonalData = mongoose.model('PersonalData');
        const personalData = new PersonalData(req.body);

        personalData.save((err)=> {

            if (!err) {
                res.send(personalData);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/personal-data/:id', (req, res)=> {

        const personalDataReq = req.body;
        const personalDataId = req.params.id;

        const PersonalData = mongoose.model('PersonalData');

        PersonalData.findByIdAndUpdate(personalDataId, personalDataReq, {'new': true}, (err, personalDataDoc)=> {

            if (!err) {
                res.send(personalDataDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/personal-data/:id', (req, res)=> {

        const personalDataId = req.params.id;
        const PersonalData = mongoose.model('PersonalData');

        PersonalData.findByIdAndRemove(personalDataId, (err, personalDataDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};