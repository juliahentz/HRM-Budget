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

    // Place of Origin resource
    require('./place-of-origin/router').init(server);
    require('./place-of-origin/model');

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
    require('./param-contact-types/router').init(server);
    require('./param-contact-types/model');

    // Tax resource
    require('./param-tax/router').init(server);
    require('./param-tax/model');
};