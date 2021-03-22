const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const config = require(`./config/${(process.env.NODE_ENV || 'development')}.json`);

// Connect to the database server.
mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });

// Check that config working and keys found.
if (!config.jwtPrivateKey) {
    console.error('FATAL ERROR: jwtPrivateKey is undefined.');
    process.exit(1);
}

// Set up the express.
const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Listen to the server.
const port = config.PORT || process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});