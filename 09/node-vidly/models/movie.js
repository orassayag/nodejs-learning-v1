const mongoose = require('mongoose');
const {
    ValidateResult
} = require('../helpers/validations');

// Create a movie schema.
const Movie = mongoose.model('movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: mongoose.model('Genre').schema,
        require: true
    },
    numberInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    }
}));

// Validate the movie Id.
const validateMovieId = (id) => {
    if (!id) {
        return new ValidateResult(false, 'No Id sent.');
    }
    return new ValidateResult(true, null);
}

// Validate the movie parameters.
const validateMovie = (movie) => {
    // Validate genreId.
    if (!movie.genreId) {
        return new ValidateResult(false, 'Parameter genreId is required.');
    }

    // Validate title.
    if (!movie.title) {
        return new ValidateResult(false, 'Parameter title is required.');
    }

    if (movie.title.length < 5 || movie.title.length > 255) {
        return new ValidateResult(false, 'Invalid parameter title (Must be at least 5 and maximum 255 characters length).');
    }

    // Validate numberInStock.
    if (!movie.numberInStock) {
        return new ValidateResult(false, 'Parameter numberInStock is required.');
    }

    if (isNaN(movie.numberInStock)) {
        return new ValidateResult(false, 'Invalid parameter numberInStock (Not a number).');
    }

    const numberInStock = parseInt(movie.numberInStock, 10);
    if (numberInStock < 0 || numberInStock > 255) {
        return new ValidateResult(false, 'Invalid parameter numberInStock (Must be at least 0 and maximum 255).');
    }

    // Validate dailyRentalRate.
    if (!movie.dailyRentalRate) {
        return new ValidateResult(false, 'Parameter dailyRentalRate is required.');
    }

    if (isNaN(movie.dailyRentalRate)) {
        return new ValidateResult(false, 'Invalid parameter dailyRentalRate (Not a number).');
    }

    const dailyRentalRate = parseInt(movie.dailyRentalRate, 10);
    if (dailyRentalRate < 0 || dailyRentalRate > 255) {
        return new ValidateResult(false, 'Invalid parameter dailyRentalRate (Must be at least 0 and maximum 255).');
    }
    return new ValidateResult(true, null);
};

module.exports.Movie = Movie;
module.exports.validateMovieId = validateMovieId;
module.exports.validateMovie = validateMovie;