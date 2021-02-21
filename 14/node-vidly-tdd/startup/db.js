const config = require(`../config/${(process.env.NODE_ENV || 'development')}.json`);
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    // Connect to the database server
    const db = config.db;
    mongoose.connect(db, {
        useNewUrlParser: true
    })
        .then(() => {
            winston.info(`Connected to ${db}...`);
        });
};