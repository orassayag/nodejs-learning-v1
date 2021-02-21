const mongoose = require('mongoose');
const {
    ValidateResult
} = require('../helpers/validations');

// Create the schema
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 100,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        trim: true
    }
}));

// Validate the user parameters
const validateUser = (user) => {
    // Validate name
    if (!user.name) {
        return new ValidateResult(false, 'Parameter name is required.');
    }

    if (user.name.length < 5 || user.name.length > 100) {
        return new ValidateResult(false, 'Invalid parameter name (Must be at least 5 and maximum 100 characters length).');
    }

    // Validate email
    if (!user.email) {
        return new ValidateResult(false, 'Parameter email is required.');
    }

    if (user.email.length < 5 || user.email.length > 100) {
        return new ValidateResult(false, 'Invalid parameter email (Must be at least 5 and maximum 100 characters length).');
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(user.email).toLowerCase())) {
        return new ValidateResult(false, 'Invalid parameter email (Not an email).');
    }

    // Validate password
    if (!user.password) {
        return new ValidateResult(false, 'Parameter password is required.');
    }

    if (user.password.length < 5 || user.password.length > 100) {
        return new ValidateResult(false, 'Invalid parameter password (Must be at least 5 and maximum 100 characters length).');
    }

    return new ValidateResult(true, null);
};

module.exports.User = User;
module.exports.validateUser = validateUser;