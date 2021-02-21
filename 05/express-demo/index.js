const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger');
const login = require('./middleware/login');
const app = express();
const Joi = require('joi');
const courses = require('./routes/courses');
const home = require('./routes/home');

const environment = app.get('env');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

/* console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`); */

if (environment === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to the db...');

app.use(logger);

app.use(login);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


/* const helmet = require('helmet');
const express = require('express');
const app = express();
const courses = require('./routes/courses');

const environment = app.get('env');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Hello'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
}); */