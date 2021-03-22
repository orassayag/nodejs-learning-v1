const {
    Genre,
    validateGenreId,
    validateGenre
} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
    ValidateResult
} = require('../helpers/validations');
const express = require('express');
const router = express.Router();

// Get all genres.
router.get('/', async (req, res) => {
    try {
        res.send(await Genre.find().sort('name'));
    } catch (err) {
        console.error('Failed to get all genres.', err);
    }
});

// Create a genre and return it.
router.post('/', auth, async (req, res) => {

    // If invalid genre parameters, return 400 - Bad Request.
    const validateGenreResult = validateRequestGenre(req);
    if (!validateGenreResult.isValid) {
        return res.status(400).send(validateGenreResult.errorMessage);
    }

    // Create a new genre.
    let genre;
    try {
        genre = await new Genre({
            name: req.body.name
        }).save();
    } catch (err) {
        console.error('Failed to create the genre.', err);
    }

    // Validate genre saved on the database, if not, return 400 - Bad Request.
    if (!genre) {
        return res.status(400).send('Failed to save the genre on the database.');
    }

    // Return the new genre.
    return res.send(genre);
});

// Update genre and return it.
router.put('/:id', async (req, res) => {

    // If invalid genre Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // If invalid genre parameters, return 400 - Bad Request.
    const validateGenreResult = validateRequestGenre(req);
    if (!validateGenreResult.isValid) {
        return res.status(400).send(validateGenreResult.errorMessage);
    }

    // Update existing genre.
    let genre;
    try {
        genre = await Genre.findByIdAndUpdate(req.params.id.trim(), {
            name: req.body.name.trim()
        }, {
            new: true
        });
    } catch (err) {
        console.error(`Failed to update the genre (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate genre saved on the database, if not, return 400 - Bad Request.
    if (!genre) {
        return res.status(400).send(`Failed to update the genre (Id: ${req.params.id.trim()}) on the database.`);
    }

    // Return updated genre.
    return res.send(genre);
});

// Delete genre and return it.
router.delete('/:id', [auth, admin], async (req, res) => {

    // If invalid genre Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // Delete genre.
    let genre;
    try {
        genre = await Genre.findByIdAndRemove(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to delete the genre (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate genre deleted from the database, if not, return 400 - Bad Request.
    if (!genre) {
        return res.status(400).send(`Failed to delete the genre (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return deleted genre.
    return res.send(genre);
});

// Get a specific genre by Id and return it.
router.get('/:id', async (req, res) => {

    // If invalid genre Id parameter, return 400 - Bad Request.
    const validateIdResult = validateRequestId(req);
    if (!validateIdResult.isValid) {
        return res.status(400).send(validateIdResult.errorMessage);
    }

    // Get the genre by Id.
    let genre;
    try {
        genre = await Genre.findById(req.params.id.trim());
    } catch (err) {
        console.error(`Failed to get the genre (Id: ${req.params.id.trim()}).`, err);
    }

    // Validate genre from the database, if not exists, return 404 - Not Found.
    if (!genre) {
        return res.status(404).send(`Failed to get the genre (Id: ${req.params.id.trim()}) from the database.`);
    }

    // Return genre.
    return res.send(genre);
});

// Validate that the request Id is not empty and the request Id parameter.
const validateRequestId = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateGenreId(req.params.id);
};

// Validate that the request body is not empty and the request body parameters.
const validateRequestGenre = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateGenre({
        name: req.body.name
    });
};

module.exports = router;