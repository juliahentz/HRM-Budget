const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/parameters/contracts', function(req, res){

        const ContractType = mongoose.model('ParamContractType');

        let query = ContractType.find();
        
        query.populate({
            path: 'grades',
            model: 'ParamContractGrade',
            populate: {
                path: 'steps',
                model: 'ParamContactStep'
            }
        });
        
        query.exec( (err, contractDoc)=> {
            if(!err){
                res.send(contractDoc);
            }else {
                res.status(400).send(err);
            }
        });

    });

    app.get('/api/parameters/contract/:id', (req, res)=> {

        const contractTypeId = req.params.id;

        const ContractType = mongoose.model('ParamContractType');

        let query = ContractType.findById(contractTypeId);

        query.populate({
            path: 'grades',
            model: 'ParamContractGrade',
            populate: {
                path: 'steps',
                model: 'ParamContactStep'
            }
        });

        query.exec((err, contractDoc)=> {

            if (!err) {
                res.send(contractDoc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.post('/api/parameters/contract', (req, res)=>{

        const ContractType = mongoose.model('ParamContractType');
        const contractType = new ContractType(req.body);

        contractType.save( (err)=> {

            if (!err) {
                res.send(contractType);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.put('/api/parameters/contract/:id', (req, res)=> {

        const contractTypeData = req.body;
        const contractTypeId = req.params.id;

        const ContractType = mongoose.model('ParamContractType');

        ContractType.findByIdAndUpdate(contractTypeId, contractTypeData, {'new': true}, (err, contractDoc)=> {

            if (!err) {
                res.send(contractDoc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.delete('/api/parameters/contract/:id', (req, res)=> {

        const contractTypeId = req.params.id;
        const ContractType = mongoose.model('ParamContractType');

        ContractType.findByIdAndRemove(contractTypeId, (err, contractDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }

        });

    });


};