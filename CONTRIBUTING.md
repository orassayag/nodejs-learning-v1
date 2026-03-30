# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/nodejs-learning-v1/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project follows Node.js and Express.js best practices:
- Use **ES6+ JavaScript** features where appropriate
- Follow **consistent naming conventions**
- Keep functions small and focused
- Use **meaningful variable names**

Before submitting:
```bash
# Install dependencies in the relevant chapter folder
npm install

# Test the application
npm start
```

### Coding Standards

1. **Error handling**: Implement proper error handling with try-catch or error middleware
2. **Async operations**: Use async/await or promises for asynchronous code
3. **Validation**: Validate input using Joi or similar libraries
4. **Security**: Follow security best practices (use helmet, validate input, etc.)
5. **Comments**: Add comments only when the code logic is not self-explanatory
6. **Naming**: Use clear, descriptive names for variables and functions

### Adding New Examples

When adding new examples or chapters:
1. Create a new numbered folder (e.g., `16/`)
2. Include a `package.json` with dependencies
3. Add a README or comments explaining the concepts demonstrated
4. Ensure all dependencies are up to date
5. Test thoroughly before submitting

### Chapter Structure

Each chapter should follow this structure:
```
XX/
├── package.json
├── index.js (or main entry point)
├── config/ (if needed)
├── routes/ (if applicable)
├── models/ (if applicable)
└── README.md (optional, for complex examples)
```

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
