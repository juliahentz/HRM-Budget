const mongoose = require('mongoose');

exports.init = (app)=> {

    app.get('/api/parameters/contract-grade/grades', (req, res)=> {

        const Grade = mongoose.model('ParamContractGrade');

        Grade.find((err, gradeDoc)=> {
            if (!err) {
                res.send(gradeDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/parameters/contract-grade/grade/:id', (req, res)=> {

        const gradeId = req.params.id;

        const Grade = mongoose.model('ParamContractGrade');

        Grade.findById(gradeId, (err, gradeDoc)=> {
            if (!err) {
                res.send(gradeDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/parameters/contract-grade/grade', (req, res)=> {

        const Grade = mongoose.model('ParamContractGrade');
        const grade = new Grade(req.body);

        grade.save((err)=> {

            if (!err) {
                res.send(grade);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/parameters/contract-grade/grade/:id', (req, res)=> {

        const gradeData = req.body;
        const gradeId = req.params.id;

        const Grade = mongoose.model('ParamContractGrade');

        Grade.findByIdAndUpdate(gradeId, gradeData, {'new': true}, (err, gradeDoc)=> {

            if (!err) {
                res.send(gradeDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/parameters/contract-grade/grade/:id', (req, res)=> {

        const gradeId = req.params.id;
        const Grade = mongoose.model('ParamContractGrade');

        Grade.findByIdAndRemove(gradeId, (err, gradeDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};