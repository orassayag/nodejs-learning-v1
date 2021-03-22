/* // Handle errors globally.
module.exports = (handler) => {
    // Check if the handler exists. If one of them is missing - return 500 - Internal Server Error.
    if (!handler) {
        console.error('No handler function provided.');
        return;
    }

    // Return the new middleware function as a reference.
    return async (req, res, next) => {
        // Execute the function.
        try {
            await handler(req, res);
        } catch (ex) {
            // If error occurred, move to the error middleware to handle the error.
            next(ex);
        }
    };
}; */