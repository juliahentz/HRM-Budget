const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    postTitle       : {type: String},
    contractType    : {type: String},
    postCategory    : {type: String},
    postGrade       : {type: Number},
    startDate       : {type: Date},
    endDate         : {type: Date},
    occupied        : {type: Boolean},
    staffOnPost:    [
        {
            startDate   : {type: Date},
            endDate     : {type: Date},
            staff       : {type: mongoose.Schema.Types.ObjectId, ref: 'StaffMember'}
        }
    ]
});

mongoose.model('Post', schema);
