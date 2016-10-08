exports.init = (server)=>{

// POST DATA TYPE

    // Post resource
    require('./post/router').init(server);
    require('./post/model');

// PERSONAL DATA TYPE

    // Staff Member resource
    require('./staff-member/router').init(server);
    require('./staff-member/model');

    // Personal Data resource
    require('./personal-data/router').init(server);
    require('./personal-data/model');

    // Step by Step resource
    require('./step-by-step/router').init(server);
    require('./step-by-step/model');

    // Socio-status resource
    require('./socio-status/router').init(server);
    require('./socio-status/model');

    // Entitlements resource
    require('./entitlements/router').init(server);
    require('./entitlements/model');

// PARAMETERS DATA TYPE

    // Allowances resource
    require('./param-allowances/router').init(server);
    require('./param-allowances/model');

    // Contract Types
    require('./param-contract-types/router').init(server);
    require('./param-contract-types/model');

    require('./param-contract-grade/router').init(server);
    require('./param-contract-grade/model');

    require('./param-contract-step/router').init(server);
    require('./param-contract-step/model');
 
    // Tax resource
    require('./param-tax/router').init(server);
    require('./param-tax/model');

    // Place of employment
    require('./param-place-of-employment/router').init(server);
    require('./param-place-of-employment/model');
};