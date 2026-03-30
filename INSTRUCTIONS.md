# Instructions

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Navigate to the chapter/module you want to explore (e.g., `05/express-demo`)
3. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

This learning repository is organized into 15 chapters, each covering different Node.js concepts:

### Chapter Overview

- **01/** - Node.js Basics: Introduction to Node.js and global objects
- **02/** - Modules: Understanding Node.js module system
- **03/** - NPM: Package management, creating and using packages
- **04/** - Express Basics: Introduction to Express framework
- **05/** - Express Advanced: Configuration, debugging, templating (Pug), middleware
- **06/** - Async Operations: Asynchronous patterns and operations
- **07/** - MongoDB Basics: MongoDB integration, CRUD operations
- **08/** - MongoDB Advanced: Complex queries and data modeling
- **09/** - MongoDB Relations: Relationships, embedding, population, ObjectIds
- **10/** - Authentication: User authentication and validation
- **11/** - Error Handling: Structured error handling in Express
- **12/** - Unit Testing: Testing with Jest
- **13/** - Integration Testing: API integration testing
- **14/** - Test-Driven Development: TDD practices
- **15/** - Deployment: Production deployment, logging, configuration

### Special Projects

- **node-vidly/** - Complete Vidly movie rental API project (final version)

## Running Examples

### Basic Node.js Examples (Chapters 01-02)
```bash
cd 01
node app.js
```

### Express Applications (Chapters 04-15)
```bash
cd 05/express-demo
npm install
npm start
```

### MongoDB Examples (Chapters 07-09)

**Prerequisites:**
- MongoDB must be installed and running locally
- Default connection: `mongodb://localhost:27017`

```bash
cd 07/mongo-demo
npm install
node index.js
```

### Testing Examples (Chapters 12-14)

```bash
cd 12/testing-demo
npm install
npm test
```

### Vidly Project (Complete Application)

The `node-vidly` and chapter 15 folders contain a complete RESTful API for a movie rental service:

```bash
cd 15/node-vidly-deployment-last
npm install
npm start
```

**Features:**
- User registration and authentication (JWT)
- Movie genres management
- Movie catalog
- Customer management
- Rental system
- Error handling and logging (Winston)
- Input validation (Joi)
- Unit and integration tests

## Configuration

### Environment Variables

Most examples in chapters 10-15 use environment variables. Create a `.env` file or set them directly:

```bash
# Example for Vidly project
export NODE_ENV=development
export JWT_PRIVATE_KEY=your_secret_key
```

### Config Files

Later chapters use the `config` package. Configuration files are in `config/` folders:
- `default.json` - Default configuration
- `development.json` - Development environment
- `production.json` - Production environment
- `test.json` - Test environment
- `custom-environment-variables.json` - Environment variable mappings

## Available Scripts

Different chapters have different scripts. Common ones:

### Start Application
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Run with Debugging
```bash
DEBUG=app:* npm start
```

### Development with Nodemon
Some projects include nodemon for auto-restart:
```bash
npm run dev
```

## Key Dependencies by Chapter

### Express & Middleware (Chapters 04-05)
- `express` - Web framework
- `joi` - Input validation
- `helmet` - Security headers
- `morgan` - HTTP logging
- `pug` - Templating engine
- `config` - Configuration management

### Database (Chapters 07-09)
- `mongoose` - MongoDB ODM
- `fawn` - Transaction support

### Authentication (Chapter 10)
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT tokens

### Logging & Errors (Chapter 11)
- `winston` - Logging framework
- `winston-mongodb` - MongoDB transport
- `express-async-errors` - Async error handling

### Testing (Chapters 12-14)
- `jest` - Testing framework
- `supertest` - HTTP testing

### Production (Chapter 15)
- `compression` - Response compression
- `helmet` - Security headers
- `winston` - Production logging

## Development Tips

### Debugging
Use VSCode launch configurations included in `.vscode/launch.json` for chapters 08-15:
1. Open the folder in VSCode
2. Go to Run and Debug (Ctrl+Shift+D)
3. Select "Launch Program"
4. Set breakpoints and start debugging

### Environment Setup
For chapters 10-15, ensure you have:
1. MongoDB running locally
2. Environment variables set
3. Config files properly configured

### Testing
Run tests before making changes:
```bash
npm test
```

For verbose output:
```bash
npm test -- --verbose
```

## Common Issues

### MongoDB Connection Errors
Ensure MongoDB is running:
```bash
# Check if MongoDB is running
mongod --version
```

### Port Already in Use
Change the port in the code or config:
```javascript
const port = process.env.PORT || 3000;
```

### Missing Dependencies
Always run `npm install` when switching chapters:
```bash
cd XX/project-name
npm install
```

### JWT Errors (Chapters 10+)
Ensure `JWT_PRIVATE_KEY` environment variable is set:
```bash
export JWT_PRIVATE_KEY=mySecureKey
```

## Learning Path

Recommended order for best learning experience:
1. Start with Chapter 01 (Node.js basics)
2. Progress sequentially through chapters 02-05 (Fundamentals)
3. Chapters 06-09 cover async and database operations
4. Chapters 10-11 cover authentication and error handling
5. Chapters 12-14 cover testing methodologies
6. Chapter 15 covers deployment

## Notes

- Each chapter builds upon concepts from previous chapters
- The Vidly project evolves throughout chapters 08-15
- Some examples require an internet connection for NPM packages
- All examples use JavaScript (ES6+)
- MongoDB examples require a local MongoDB instance

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
