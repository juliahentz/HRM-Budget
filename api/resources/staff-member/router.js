const mongoose = require('mongoose');

exports.init = function(app){

    app.get('/api/staff-members', (req, res)=>{

        const StaffMember = mongoose.model('StaffMember');

        const query = StaffMember.find();

        //query.populate('placeOfOrigin socioStatus entitlements');
        query.populate('personalData stepByStep');

        query.exec( (err, staffMemberDoc)=> {
            if(!err){
                res.send(staffMemberDoc);
            }else {
                res.status(400).send(err);
            }
        });
    });

    app.get('/api/staff-member/:id', (req, res)=> {

        const staffMemberId = req.params.id;

        const StaffMember = mongoose.model('StaffMember');

        var query = StaffMember.findById({_id: staffMemberId});

        //query.populate('placeOfOrigin socioStatus entitlements');
        query.populate('personalData stepByStep');

        query.exec((err, staffMemberDoc)=> {

            if (!err) {
                res.send(staffMemberDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });
    
    app.post('/api/staff-member', (req, res)=>{

        const StaffMember = mongoose.model('StaffMember');
        const staffMember = new StaffMember(req.body);

        staffMember.save( (err)=> {

            if (!err) {
                res.send(staffMember);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.put('/api/staff-member/:id', (req, res)=> {

        const staffMemberData = req.body;
        const staffMemberId = req.params.id;

        const StaffMember = mongoose.model('StaffMember');

        StaffMember.findByIdAndUpdate(staffMemberId, staffMemberData, {'new': true}, (err, staffMemberDoc)=> {

            if (!err) {
                res.send(staffMemberDoc);
            } else {
                res.status(400).send(err);
            }
        });
    });

    app.delete('/api/staff-member/:id', (req, res)=> {

        const staffMemberId = req.params.id;
        const StaffMember = mongoose.model('StaffMember');

        StaffMember.findByIdAndRemove(staffMemberId, (err, staffMemberDoc)=> {

            if (!err) {
                res.sendStatus(200);
            } else {
                res.status(400).send(err);
            }
        });
    });
};