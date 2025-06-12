# Contributing to CR Chatbot

Thank you for your interest in contributing to CR Chatbot! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/cr-chatbot.git
   cd cr-chatbot
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites
- A modern web browser
- Python 3.x (for local development server)
- A running Ollama instance for testing

### Local Development
1. **Start the development server**:
   ```bash
   npm run dev
   # or
   cd cr-chatbot && python3 -m http.server 9000
   ```
2. **Open your browser** to http://localhost:9000
3. **Configure Ollama endpoint** in the settings panel

## Project Structure

```
cr-chatbot/
├── index.html          # Main HTML file
├── styles.css          # Complete styling and theming
├── script.js           # Core JavaScript functionality
├── README.md           # Project documentation
└── chatbot/           # Directory for saved conversations
```

## Coding Standards

### HTML
- Use semantic HTML5 elements
- Include proper accessibility attributes (ARIA labels, alt text)
- Maintain proper document structure

### CSS
- Use CSS custom properties (variables) for theming
- Follow BEM methodology for class naming when applicable
- Ensure responsive design principles
- Support both light and dark themes

### JavaScript
- Use ES6+ features appropriately
- Follow consistent naming conventions (camelCase)
- Add JSDoc comments for functions
- Handle errors gracefully with user-friendly messages
- Use meaningful variable and function names

### Code Quality
- Test your changes across different browsers
- Ensure mobile responsiveness
- Verify accessibility compliance
- Check for console errors

## Types of Contributions

### Bug Fixes
- Check existing issues before creating a new one
- Include steps to reproduce the bug
- Test your fix thoroughly

### New Features
- Open an issue first to discuss the feature
- Ensure it aligns with the project's goals
- Update documentation as needed
- Add appropriate error handling

### Documentation
- Fix typos and improve clarity
- Add examples for new features
- Update setup instructions if needed

### UI/UX Improvements
- Maintain the clean, professional design aesthetic
- Ensure changes work across all supported browsers
- Test on both desktop and mobile devices

## Submitting Changes

1. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add: Support for custom model parameters"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Reference to related issues

## Pull Request Guidelines

### Before Submitting
- [ ] Test your changes locally
- [ ] Check for JavaScript errors in console
- [ ] Verify responsive design on mobile
- [ ] Ensure accessibility compliance
- [ ] Update documentation if needed

### PR Description Should Include
- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: Technical approach taken
- **Testing**: How you tested the changes
- **Screenshots**: For visual changes

## Issue Guidelines

### Bug Reports
Include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots (if applicable)

### Feature Requests
Include:
- Clear description of the feature
- Use case/problem it solves
- Proposed implementation approach
- Mockups or examples (if applicable)

## Code Review Process

1. **Automated Checks**: GitHub Actions will run basic checks
2. **Maintainer Review**: A project maintainer will review your PR
3. **Feedback**: Address any requested changes
4. **Merge**: Once approved, your PR will be merged

## Development Tips

### Testing Thinking Models
- Use models that support `<think>` tags (like o1)
- Test both thinking and non-thinking responses
- Verify the collapsible interface works correctly

### Browser Testing
Test in at least:
- Chrome/Chromium
- Firefox
- Safari (if available)
- Mobile browsers

### Common Issues
- **CORS errors**: Use a proper HTTP server, not file:// protocol
- **Ollama connection**: Ensure Ollama is running and accessible
- **Mobile layout**: Test at various screen sizes

## Getting Help

- **Documentation**: Check the README.md first
- **Issues**: Search existing issues for similar problems
- **Discussions**: Use GitHub Discussions for questions
- **Examples**: Look at existing code for patterns

## Recognition

Contributors will be acknowledged in:
- GitHub contributors list
- Release notes for significant contributions
- README credits section

## License

By contributing to CR Chatbot, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make CR Chatbot better! 🚀
