'use strict'

const mongoose = require('mongoose');

exports.init = (app)=> {
    
    app.get('/api/all-entitlements', (req, res)=> {

        const Entitlements = mongoose.model('Entitlements');

        Entitlements.find((err, entitlementsDoc)=> {
            if (!err) {
                res.send(entitlementsDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/entitlements/:id', (req, res)=> {

        const entitlementsId = req.params.id;

        const Entitlements = mongoose.model('Entitlements');

        Entitlements.findById({_id: entitlementsId}, (err, entitlementsDoc)=> {

            if (!err) {
                res.send(entitlementsDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/entitlements', (req, res)=> {

        const Entitlements = mongoose.model('Entitlements');
        const entitlements = new Entitlements(req.body);

        entitlements.save((err)=> {

            if (!err) {
                res.send(entitlements);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/entitlements/:id', (req, res)=> {

        const entitlementsData = req.body;
        const entitlementsId = req.params.id;

        const Entitlements = mongoose.model('Entitlements');

        Entitlements.findByIdAndUpdate(entitlementsId, entitlementsData, {'new': true}, (err, entitlementsDoc)=> {

            if (!err) {
                res.send(entitlementsDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/entitlements/:id', (req, res)=> {

        const entitlementsId = req.params.id;
        const Entitlements = mongoose.model('Entitlements');

        Entitlements.findByIdAndRemove(entitlementsId, (err, entitlementsDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });

};