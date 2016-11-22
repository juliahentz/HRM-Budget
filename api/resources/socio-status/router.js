'use strict'

const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/socio-statuses', (req, res)=> {

        const SocioStatus = mongoose.model('SocioStatus');

        const query = SocioStatus.find();

        query.populate('dateInterval');

        query.exec((err, socioStatusDoc)=> {
            if (!err) {
                res.send(socioStatusDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/socio-status/:id', (req, res)=> {

        const socioStatusId = req.params.id;

        const SocioStatus = mongoose.model('SocioStatus');

        const query = SocioStatus.findById();

        query.populate('dateInterval');

        query.exec({_id: socioStatusId}, (err, socioStatusDoc)=> {

            if (!err) {
                res.send(socioStatusDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/socio-status', (req, res)=> {

        const SocioStatus = mongoose.model('SocioStatus');
        const socioStatus = new SocioStatus(req.body);

        socioStatus.save((err)=> {

            if (!err) {
                res.send(socioStatus);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/socio-status/:id', (req, res)=> {

        const socioStatusData = req.body;
        const socioStatusId = req.params.id;

        const SocioStatus = mongoose.model('SocioStatus');

        SocioStatus.findByIdAndUpdate(socioStatusId, socioStatusData, {'new': true}, (err, socioStatusDoc)=> {

            if (!err) {
                res.send(socioStatusDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/socio-status/:id', (req, res)=> {

        const socioStatusId = req.params.id;
        const SocioStatus = mongoose.model('SocioStatus');

        SocioStatus.findByIdAndRemove(socioStatusId, (err, socioStatusDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};