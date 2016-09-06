const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/staff-member', (req, res)=>{

        const StaffMember = mongoose.model('StaffMember');

        let query = StaffMember.find();

        //query.populate('personalData placeOfOrigin stepByStep socioStatus entitlements');

        query.exec( (err, staffMemberDoc)=> {
            if(!err){
                res.send(staffMemberDoc);
            }else {
                res.status(400).send(err);
            }
        });

    });

    app.post('/api/staff-member', (req, res)=>{

        const StaffMember = mongoose.model('StaffMember');
        let staffMember = new StaffMember(req.body);

        console.log('create staff member database element');

        staffMember.save( (err)=> {

            if (!err) {
                res.send(staffMember);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.put('/api/staff-member/:id', (req, res)=> {

        let staffMemberData = req.body;
        let staffMemberId = req.params.id;

        const StaffMember = mongoose.model('StaffMember');

        StaffMember.findByIdAndUpdate(staffMemberId, staffMemberData, {'new': true}, function (err, staffMemberDoc) {

            if (!err) {
                res.send(staffMemberDoc);
            } else {
                res.status(400).send(err);
            }

        });

    });

    app.delete('/api/staff-member/:id', (req, res)=> {

        var staffMemberId = req.params.id;
        const StaffMember = mongoose.model('StaffMember');

        StaffMember.findByIdAndRemove(staffMemberId, function (err, staffMemberDoc) {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }

        });

    });

};