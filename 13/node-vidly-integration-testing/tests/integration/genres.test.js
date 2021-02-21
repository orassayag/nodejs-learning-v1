const request = require('supertest');
const {
    Genre
} = require('../../models/genre');
const {
    User
} = require('../../models/user');

let server;

// Integration tests for genres
describe('/api/genres', () => {
    // Create the server before each test
    beforeEach(() => {
        server = require('../../index');
    });

    // Close the server after each test
    afterEach(async () => {
        if (server) {
            server.close();
        }

        // Remove fake genres
        await Genre.remove({});
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            // Insert fake genres
            await Genre.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);

            // Get response from the API.
            const res = await request(server).get('/api/genres');

            // Check status code.
            expect(res.status).toBe(200);

            // Check array length.
            expect(res.body.length).toBe(2);

            // Check for the specific inserted documents.
            expect(res.body.some((g) => {
                return g.name === 'genre1';
            })).toBeTruthy();
            expect(res.body.some((g) => {
                return g.name === 'genre2';
            })).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return specific genre by given id', async () => {
            // Insert fake genre
            const genre = await new Genre({
                name: 'genre1'
            }).save();

            // Get response from the API.
            const res = await request(server).get('/api/genres/' + genre._id);

            // Check status code.
            expect(res.status).toBe(200);

            // Check match objects.
            expect(res.body).toMatchObject({ _id: genre._id.toString(), name: 'genre1' });

            // Check specific property for extra security.
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 genre by given id that not exists in the database', async () => {
            // Insert fake genre
            const genre = await new Genre({
                name: 'genre1'
            }).save();

            // Remove the genre from the database so that we can generate 404.
            await Genre.findByIdAndRemove(genre._id);

            // Get response from the API.
            const res = await request(server).get('/api/genres/' + genre._id);

            // Check status code.
            expect(res.status).toBe(404);
        });

        it('should return 400 genre by given id that is not valid', async () => {
            // Get response from the API.
            const res = await request(server).get('/api/genres/2');

            // Check status code.
            expect(res.status).toBe(400);
        });
    });

    describe('POST /', () => {
        // Define the happy path, and then in each test we change
        // one parameter that clearly aligns with the name of the
        // test.
        let token;
        let name;
        const execute = async () => {
            // Call the API to create new genre.
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name });
        };

        // Generate user token and parameter name before each test
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        it('should return 401 if client not logged in', async () => {
            // Set the token to be empty.
            token = '';

            // Call the API to create new genre.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(401);
        });

        it('should return 400 if client not provided parameter name', async () => {
            // Set the name to be empty.
            name = '';

            // Call the API to create new genre.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should return 400 if client not provided name parameter that is less than 5 characters length', async () => {
            // Set the genre name to be less than 5 characters length.
            name = 'genr';

            // Call the API to create new genre.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should return 400 if client not provided name parameter that is more than 50 characters length', async () => {
            // Set the genre name to be more than 50 characters length.
            name = new Array(52).join('a');

            // Call the API to create new genre.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(400);
        });

        it('should save the genre on the database', async () => {
            // Call the API to create new genre.
            const res = await execute();

            // Get the genre from database.
            const genre = await Genre.findOne({ name: name });

            // Check status code.
            expect(res.status).toBe(200);

            // Check that genre exists.
            expect(genre).not.toBeNull();
        });

        it('should return 200 with the new genre', async () => {
            // Call the API to create new genre.
            const res = await execute();

            // Check status code.
            expect(res.status).toBe(200);

            // Check for id and name properties.
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});

// Integration tests for auth middlewere.
describe('auth middlewere', () => {
    // Create the server before each test
    beforeEach(() => {
        server = require('../../index');
    });

    // Close the server after each test
    afterEach(async () => {
        if (server) {
            server.close();
        }

        // Remove fake genres
        await Genre.remove({});
    });

    let token;
    let tokenKey;
    const execute = () => {
        return request(server)
            .post('/api/genres')
            .set(tokenKey, token)
            .send({ name: 'genre1' });
    };

    // Generate user token before each test.
    beforeEach(() => {
        token = new User().generateAuthToken();
        tokenKey = 'x-auth-token';
    });

    it('should return 401 if no token was provided', async () => {
        // Set the token to be empty.
        token = '';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 401 if empty space token was provided', async () => {
        // Set the token to be empty space.
        token = ' ';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 401 if invalid (undefined) token was provided', async () => {
        // Set the token key to invalid.
        tokenKey = 'x-au';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(401);
    });

    it('should return 400 if invalid (null) token was provided', async () => {
        // Set the token to be null.
        token = null;

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(400);
    });

    it('should return 400 if invalid token was provided', async () => {
        // Set the token to be invalid.
        token = 'a';

        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(400);
    });

    it('should return 200 and user payload if valid token was provided', async () => {
        // Call the API.
        const res = await execute();

        // Check the status code.
        expect(res.status).toBe(200);
    });
});