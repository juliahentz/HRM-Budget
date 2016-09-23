const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/posts', (req, res)=>{

        const Post = mongoose.model('Post');

        const query = Post.find();

        query.populate({
            path: 'staffOnPost.staff',
            model: 'StaffMember'
        });

        query.exec( (err, postDoc)=> {
            if(!err){
                res.send(postDoc);
            }else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/post/:id', (req, res)=> {

        const postId = req.params.id;

        const Post = mongoose.model('Post');

        var query = Post.findById({_id: postId});

        //query.populate('personalData placeOfOrigin stepByStep socioStatus entitlements');

        query.exec( (err, postDoc)=> {

            if (!err) {
                res.send(postDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.post('/api/post', (req, res)=>{

        const Post = mongoose.model('Post');
        const post = new Post(req.body);

        post.save( (err)=> {

            if (!err) {
                res.send(post);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/post/:id', (req, res)=> {

        const postData = req.body;
        const postId = req.params.id;

        const Post = mongoose.model('Post');

        Post.findByIdAndUpdate(postId, postData, {'new': true}, (err, postDoc)=> {

            if (!err) {
                res.send(postDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/post/:id', (req, res)=> {

        const postId = req.params.id;
        const Post = mongoose.model('Post');

        Post.findByIdAndRemove(postId, (err, postDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};