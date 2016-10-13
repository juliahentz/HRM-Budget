'use strict'

const mongoose = require('mongoose');
const chalk = require('chalk');

exports.connect = ()=> {

    return new Promise((resolve, reject)=> {

        mongoose.Promise = global.Promise;

        mongoose.connect('mongodb://localhost/hrm-budget');

        mongoose.connection.on('error', (err)=> {

            console.log('Mongo error: ', err);
            reject(err);
        });

        mongoose.connection.once('open', ()=> {

            console.log(chalk.blue('Database connection is open'));

            resolve();
        });
    });
};