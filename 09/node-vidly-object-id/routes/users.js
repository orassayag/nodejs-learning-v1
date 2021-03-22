const mongoose = require('mongoose');
const {
    User,
    validateUser
} = require('../models/user');
const express = require('express');
const router = express.Router();

// Create a user and return it.
router.post('/', async (req, res) => {

    // If invalid rental parameters, return 400 - Bad Request.
    const validateResult = validateRequestUser(req);
    if (!validateResult.isValid) {
        return res.status(400).send(validateResult.errorMessage);
    }

    // Check if not exists already with a specific email on the database.
    let existsUser;
    try {
        existsUser = await User.findOne({
            email: req.body.email.trim()
        });
    } catch (err) {
        // If an exception occurred, return 500 - Internal Server Error.
        console.error('Failed to create a user.', err);
        return res.status(500).send('Failed to create a user.');
    }

    if (existsUser) {
        return res.status(400).send(`User with the email ${req.body.email} already exists on the database.`);
    }

    // Create the new user and save it to the database.
    let user;
    try {
        user = await new User({
            name: req.body.name.trim(),
            email: req.body.email.trim(),
            password: req.body.password.trim()
        }).save();
    } catch (err) {
        // If an exception occurred, return 500 - Internal Server Error.
        console.error('Failed to create a user.', err);
        return res.status(500).send('Failed to create a user.');
    }

    // Validate user saved on the database, if not, return 400 - Bad Request.
    if (!user) {
        return res.status(400).send('Failed to save the user on the database.');
    }

    // Return the user.
    res.send(user);

});

// Validate that the request body is not empty and the request body parameters.
const validateRequestUser = (req) => {
    if (!req) {
        return new ValidateResult(false, 'No request object.');
    }

    // Get final validation result from model validator function.
    return validateUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
};

module.exports = router;