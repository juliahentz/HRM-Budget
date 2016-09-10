const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/parameters/contract/steps', function(req, res){

        const Step = mongoose.model('ParamContactStep');

        Step.find( (err, stepDoc)=> {
            if(!err){
                res.send(stepDoc);
            }else {
                res.status(400).send(err);
            }
        });

    });

    app.post('/api/parameters/contract/step', (req, res)=>{

        const Step = mongoose.model('ParamContactStep');
        const step = new Step(req.body);

        step.save( (err)=> {

            if (!err) {
                res.send(step);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.put('/api/parameters/contract/step/:id', (req, res)=> {

        const stepData = req.body;
        const stepId = req.params.id;

        const Step = mongoose.model('ParamContactStep');

        Step.findByIdAndUpdate(stepId, stepData, {'new': true}, function (err, stepDoc) {

            if (!err) {
                res.send(stepDoc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.delete('/api/parameters/contract/step/:id', (req, res)=> {

        const stepId = req.params.id;
        const Step = mongoose.model('ParamContactStep');

        Step.findByIdAndRemove(stepId, (err, stepDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }

        });

    });


};