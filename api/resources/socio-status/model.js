// DON'T FORGET TO ADD REQUIRE STATEMENTS IN THE INDEX.js FILE

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    dateCreated             : { type: Date, default : Date.now },
    householdAllowance      : { type: Boolean },
    childAllowance          : { type: Boolean },
    dependentChildAllowance : { type: Boolean },
    expatriationAllowance   : { type: Boolean },

});

mongoose.model('SocioStatus', schema);
