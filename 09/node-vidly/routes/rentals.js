const {
    Rental,
    validateRental
} = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const {
    ValidateResult
} = require('../helpers/validations');
const express = require('express');
const router = express.Router();

// Get all rentals.
router.get('/', async (req, res) => {
    try {
        res.send(await Rental.find()
            .populate('Customer', 'name')
            .populate('Movie', 'title')
            .sort('rentalDate'));
    } catch (err) {
        console.error('Failed to get all rentals.', err);
    }
});

// Create a rental and return it.
router.post('/', async (req, res) => {

    // If invalid rental parameters, return 400 - Bad Request.
    const validateRentalResult = validateRequestRental(req);
    if (!validateRentalResult.isValid) {
        return res.status(400).send(validateRentalResult.errorMessage);
    }

    // Get the movie of the rental by the Id.
    const movie = await Movie.findById(req.body.movieId);

    // Validate movie exists on the database, if not, return 400 - Bad Request.
    if (!movie) {
        return res.status(400).send(`Movie not found (Id: ${req.body.movieId.trim()}) on the database.`);
    }

    // Check if the movie is available to be rental, by the number in stock, if not, return 400 - Bad Request.
    if (movie.numberInStock === 0) {
        return res.status(400).send(`Movie ${movie.title} is out of stock.`);
    }

    // Get the customer of the rental by the Id.
    const customer = await Customer.findById(req.body.customerId);

    // Validate customer exists on the database, if not, return 400 - Bad Request.
    if (!customer) {
        return res.status(400).send(`Customer not found (Id: ${req.body.customerId.trim()}) on the database.`);
    }

    // Create a new rental.
    let rentSuccess = true;
    let rental;
    try {
        rental = await new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                isGold: customer.isGold,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },
        }).save();
    } catch (err) {
        rentSuccess = false;
        console.error('Failed to create the rental.', err);
    }

    // Validate rental saved on the database, if not, return 400 - Bad Request.
    if (!rental) {
        rentSuccess = false;
        return res.status(400).send('Failed to save the rental on the database.');
    }

    // Rent the movie only if the rental was successfully added to the database.
    if (rentSuccess) {
        try {
            movie.numberInStock--;
            movie.save();
        } catch (err) {
            console.error('Failed to create the rental.', err);
        }
    }

    // Return the new rental.
    return res.send(rental);
});

// Validate that the request body is not empty and the request body parameters.
const validateRequestRental = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateRental({
        customerId: req.body.customerId,
        movieId: req.body.movieId
    });
};

module.exports = router;