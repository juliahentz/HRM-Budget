'use strict';

const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/parameters/place-of-employments', (req, res)=> {

        const ParamPlaceOfEmployment = mongoose.model('ParamPlaceOfEmployment');

        ParamPlaceOfEmployment.find((err, paramPlaceOfEmploymentDoc)=> {
            if (!err) {
                res.send(paramPlaceOfEmploymentDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/parameters/place-of-employment', (req, res)=> {

        const ParamPlaceOfEmployment = mongoose.model('ParamPlaceOfEmployment');
        const paramPlaceOfEmployment = new ParamPlaceOfEmployment(req.body);

        paramPlaceOfEmployment.save((err)=> {

            if (!err) {
                res.send(paramPlaceOfEmployment);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/parameters/place-of-employment/:id', (req, res)=> {

        const paramPlaceOfEmploymentData = req.body;
        const paramPlaceOfEmploymentId = req.params.id;

        const ParamPlaceOfEmployment = mongoose.model('ParamPlaceOfEmployment');

        ParamPlaceOfEmployment.findByIdAndUpdate(paramPlaceOfEmploymentId, paramPlaceOfEmploymentData, {'new': true}, (err, paramPlaceOfEmploymentDoc)=> {

            if (!err) {
                res.send(paramPlaceOfEmploymentDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/parameters/place-of-employment/:id', (req, res)=> {

        const paramPlaceOfEmploymentId = req.params.id;
        const ParamPlaceOfEmployment = mongoose.model('ParamPlaceOfEmployment');

        ParamPlaceOfEmployment.findByIdAndRemove(paramPlaceOfEmploymentId, (err, paramPlaceOfEmploymentDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};