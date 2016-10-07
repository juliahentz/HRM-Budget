const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/step-by-steps', (req, res)=> {

        const StepByStep = mongoose.model('StepByStep');

        StepByStep.find((err, stepByStepDoc)=> {
            if (!err) {
                res.send(stepByStepDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/step-by-step/:id', (req, res)=> {

        const StepByStepId = req.params.id;

        const StepByStep = mongoose.model('StepByStep');

        StepByStep.findById(StepByStepId, (err, stepByStepDoc)=> {

            if (!err) {
                res.send(stepByStepDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/step-by-step', (req, res)=> {

        const StepByStep = mongoose.model('StepByStep');
        const stepByStep = new StepByStep(req.body);

        stepByStep.save((err)=> {

            if (!err) {
                res.send(stepByStep);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/step-by-step/:id', (req, res)=> {

        const StepByStepData = req.body;
        const StepByStepId = req.params.id;

        const StepByStep = mongoose.model('StepByStep');

        StepByStep.findByIdAndUpdate(StepByStepId, StepByStepData, {'new': true}, (err, stepByStepDoc)=> {

            if (!err) {
                res.send(stepByStepDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/step-by-step/:id', (req, res)=> {

        const StepByStepId = req.params.id;
        const StepByStep = mongoose.model('StepByStep');

        StepByStep.findByIdAndRemove(StepByStepId, (err, stepByStepDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};