const mongoose = require('mongoose');
const chalk   = require('chalk');

exports.connect = ()=>{

    return new Promise((resolve, reject)=>{

        mongoose.connect('mongodb://localhost/sm-api');

        mongoose.connection.on('error', (err)=>{

            console.log('Mongo error: ', err);
            reject(err);

        });

        mongoose.connection.once('open', ()=>{

            console.log(chalk.blue('Database connection is open'));

            resolve();

        });

    });

};