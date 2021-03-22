const express = require('express');
const genres = require('./routes/genres');
require('dotenv');

// Set up the express.
const app = express();
app.use(express.json());
app.use('/api/genres', genres);

// Listen to the server.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});