'use strict';

const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/date-interval/:id', (req, res)=> {

        const dateIntervalId = req.params.id;

        const DateInterval = mongoose.model('DateInterval');

        DateInterval.findById({_id: dateIntervalId}, (err, dateIntervalDoc)=> {

            if (!err) {
                res.send(dateIntervalDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/date-interval', (req, res)=> {

        const DateInterval = mongoose.model('DateInterval');
        const dateInterval = new DateInterval(req.body);

        dateInterval.save((err)=> {

            if (!err) {
                res.send(dateInterval);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/date-interval/:id', (req, res)=> {

        const dateIntervalData = req.body;
        const dateIntervalId = req.params.id;

        const DateInterval = mongoose.model('DateInterval');

        DateInterval.findByIdAndUpdate(dateIntervalId, dateIntervalData, {'new': true}, (err, dateIntervalDoc)=> {

            if (!err) {
                res.send(dateIntervalDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/date-interval/:id', (req, res)=> {

        const dateIntervalId = req.params.id;
        const DateInterval = mongoose.model('DateInterval');

        DateInterval.findByIdAndRemove(dateIntervalId, (err, dateIntervalDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });

};