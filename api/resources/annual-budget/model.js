const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    year: {type: Number},
    data: [
        {
            month: {type: Number},
            salarySum: {type: Number},
            headOfUnitSum: {type: Number}
        }
    ]


});

mongoose.model('AnnualBudget', schema);
