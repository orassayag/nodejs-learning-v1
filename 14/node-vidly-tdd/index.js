const config = require(`./config/${(process.env.NODE_ENV || 'development')}.json`);
const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')(config);

// Listen to the server.
const port = config.PORT || process.env.PORT || 3000;
module.exports = app.listen(port, () => {
    winston.info(`Listening to port ${port}...`);
});