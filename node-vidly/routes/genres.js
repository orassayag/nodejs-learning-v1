const express = require('express');
const router = express.Router();

// Genre class.
class Genre {
    constructor(id, name) {
        this.Id = id;
        this.Name = name;
    }
};

// Genres array (Local database).
const genres = [
    new Genre(1, 'Comedy'),
    new Genre(2, 'Crime'),
    new Genre(3, 'Drama'),
    new Genre(4, 'Historical'),
    new Genre(5, 'Thriller')
];

// Get all genres.
router.get('/', (req, res) => {
    res.send(genres);
});

// Get a specific genre by Id.
router.get('/:id', (req, res) => {

    // If invalid, return 400 (Bad Request) and error message.
    const validateResult = validateGenreId(req);
    if (!validateResult.IsValid) {
        return res.status(400).send(validateResult.ErrorMessage);
    }

    // If genre is not found, return 404 (Not found) and error message.
    const genre = getGenreById(parseInt(req.params.id, 10));
    if (!genre) {
        return res.status(404).send(`Genre with the Id of ${req.params.id} was not found.`);
    }

    // Return genre.
    return res.send(genre);
});

// Create a new genre.
router.post('/', (req, res) => {

    // If invalid, return 400 (Bad Request) and error message.
    const validateResult = validateGenre(req);
    if (!validateResult.IsValid) {
        return res.status(400).send(validateResult.ErrorMessage);
    }

    // Create a new genre and push to the database.
    const genre = new Genre(genres.length + 1, req.body.name);
    genres.push(genre);

    // Return the new genre.
    return res.send(genre);
});

// Update genre.
router.put('/:id', (req, res) => {

    // If invalid, return 400 (Bad Request) and error message.
    const validateResult = validateGenre(req);
    if (!validateResult.IsValid) {
        return res.status(400).send(validateResult.ErrorMessage);
    }

    // If genre is not found, return 404 (Not found) and error message.
    const genre = getGenreById(parseInt(req.params.id, 10));
    if (!genre) {
        return res.status(404).send(`Genre with the Id of ${req.params.id} was not found.`);
    }

    // Update the specific genre and update the database.
    genre.Name = req.body.name;
    genres.forEach((cur, i) => {
        if (cur.Id === genre.Id) {
            genres[i] = genre;
        }
    });

    // Return updated genre.
    return res.send(genre);
});

// Delete genre.
router.delete('/:id', (req, res) => {

    // If genre is not found, return 404 (Not found) and error message.
    const genreId = parseInt(req.params.id, 10);
    const genre = getGenreById(genreId);
    if (!genre) {
        return res.status(404).send(`Genre with the Id of ${req.params.id} was not found.`);
    }

    // Get the index of the genre and remove Id from the database.
    const genreIndex = getGenreIndexById(genreId);
    genres.splice(genreIndex, 1);

    // Return deleted genre.
    return res.send(genre);
});

// Helpers.

// ValidationResult class (for any result of the validation in each method).
class ValidationResult {
    constructor(isValid, errorMessage) {
        this.IsValid = isValid;
        this.ErrorMessage = errorMessage;
    }
}

// Get the genre by the Id.
const getGenreById = (id) => {
    return genres.find((cur) => {
        return cur.Id === id;
    });
};

// Get the genre index in the array by the Id.
const getGenreIndexById = (id) => {
    return genres.findIndex((cur) => {
        return cur.Id === id;
    });
};

// Validate genre by request body parameters.
const validateGenre = (req) => {
    if (!req || !req.body.name) {
        return new ValidationResult(false, 'No request exists or no genre name was provided.');
    }

    if (req.body.name.length < 3) {
        return new ValidationResult(false, 'Genre name was less than 3 characters length.');
    }
    return new ValidationResult(true, null);
};

// Validate genre Id by request parameters.
const validateGenreId = (req) => {
    if (!req || !req.params.id) {
        return new ValidationResult(false, 'No request exists or no genre Id was provided.');
    }

    if (isNaN(req.params.id)) {
        return new ValidationResult(false, 'Invalid genre Id.');
    }
    return new ValidationResult(true, null);
}

module.exports = router;