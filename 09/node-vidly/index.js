const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');
require('dotenv');

// Connect to the database server
mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });

// Set up the express
const app = express();
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

// Listen to the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});