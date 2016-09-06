exports.init = (server)=>{

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

    // Base Salary - CA resource
    require('./param-base-salary-ca/router').init(server);
    require('./param-base-salary-ca/model');

    // Base Salary - TA resource
    require('./param-base-salary-ta/router').init(server);
    require('./param-base-salary-ta/model');

    // Tax resource
    require('./param-tax/router').init(server);
    require('./param-tax/model');
    
};