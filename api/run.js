const server = require('./server');
const database  = require('./database');

function init(){

    database.connect()
        .then(server.init)
        .then((server)=>{

            require('./resources')(server);

        })
        .catch((err)=>{

            console.log('Init error: ', err);

        });

}

init();