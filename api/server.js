'use strict'

const express = require('express');
const chalk = require('chalk');
const server = express();
const bodyParser = require('body-parser');
const budgetParser = require('./budget-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

exports.init = ()=> {

    server.listen(3000, ()=> {

        console.log(chalk.magenta('Server is running on port: 3000'));
        server.use('/', express.static('../app'));
        server.use('/dist', express.static('../app/dist'));
        server.use('/admin', express.static('../admin'));

        budgetParser.budgetCalc();
    });

    return server;
};