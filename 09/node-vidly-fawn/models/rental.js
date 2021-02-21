const mongoose = require('mongoose');
const {
    ValidateResult
} = require('../helpers/validations');

// Create the schema
const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Number
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

// Validate the rental parameters
const validateRental = (rental) => {
    // Validate customerId
    if (!rental.customerId) {
        return new ValidateResult(false, 'Parameter customerId is required.');
    }

    // Validate movieId
    if (!rental.movieId) {
        return new ValidateResult(false, 'Parameter movieId is required.');
    }

    return new ValidateResult(true, null);
};

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;