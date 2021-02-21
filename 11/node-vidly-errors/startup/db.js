const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    // Connect to the database server
    mongoose.connect('mongodb://localhost:27017/vidly', {
        useNewUrlParser: true
    })
        .then(() => {
            winston.info('Connected to MongoDB...');
        });
};