const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    gradeOne:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number}
    },
    gradeTwo:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeThree:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeFour:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeFive:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeSix:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeSeven:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeEight:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeNine:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number}
    },
    gradeTen:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeEleven:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeTwelve:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeThirteen:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number}
    },
    gradeFourteen:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number},
        stepSeven   :{type: Number},
        stepEight   :{type: Number}
    },
    gradeFifteen:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number}
    },
    gradeSixteen:{
        stepOne     :{type: Number},
        stepTwo     :{type: Number},
        stepThree   :{type: Number},
        stepFour    :{type: Number},
        stepFive    :{type: Number},
        stepSix     :{type: Number}
    }

});

mongoose.model('ParamBaseSalaryCa', schema);