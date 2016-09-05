const express = require('express');
const chalk   = require('chalk');
const server  = express();
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

exports.init = ()=>{

    server.listen(3000, ()=>{

        console.log(chalk.magenta('Server is running on port: 3000'));

    });

    return server;

};