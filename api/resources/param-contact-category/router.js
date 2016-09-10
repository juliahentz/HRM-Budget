const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/parameters/contract/categories', function(req, res){

        const Category = mongoose.model('ParamContactCategory');

        Category.find( (err, categoryDoc)=> {
            if(!err){
                res.send(categoryDoc);
            }else {
                res.status(400).send(err);
            }
        });

    });

    app.post('/api/parameters/contract/category', (req, res)=>{

        const Category = mongoose.model('ParamContactCategory');
        const category = new Category(req.body);

        category.save( (err)=> {

            if (!err) {
                res.send(category);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.put('/api/parameters/contract/category/:id', (req, res)=> {

        const categoryData = req.body;
        const categoryId = req.params.id;

        const Category = mongoose.model('ParamContactCategory');

        Category.findByIdAndUpdate(categoryId, categoryData, {'new': true}, function (err, categoryDoc) {

            if (!err) {
                res.send(categoryDoc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.delete('/api/parameters/contract/category/:id', (req, res)=> {

        const categoryId = req.params.id;
        const Category = mongoose.model('ParamContactCategory');

        Category.findByIdAndRemove(categoryId, (err, categoryDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }

        });

    });
};