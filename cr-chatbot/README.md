# CR Chatbot

A professional, clean web-based chatbot frontend for Ollama endpoints. Developed by **3eekeeper**.

![CR Chatbot Interface](https://img.shields.io/badge/Status-Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

CR Chatbot is a simple yet powerful web interface that allows users to interact with Ollama language models through a clean, professional interface. Built with vanilla HTML, CSS, and JavaScript, it requires no external dependencies and provides all essential functionality for a complete chat experience.

## Features

### Core Functionality
- ✅ **Professional UI**: Clean, modern design with intuitive user experience
- ✅ **Ollama Integration**: Direct connection to any Ollama endpoint
- ✅ **Custom System Prompts**: Set personalized system prompts for different use cases
- ✅ **Conversation History**: Maintains conversation context during sessions
- ✅ **Message Formatting**: Support for basic markdown formatting (bold, italic, code)
- ✅ **Real-time Status**: Connection status indicator with visual feedback
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Features
- ✅ **Save Conversations**: Export entire conversations to plain text files
- ✅ **Multiple Conversations**: Start new conversations while preserving history
- ✅ **Configuration Panel**: Easy setup and management of settings
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Toast Notifications**: Non-intrusive status updates and alerts
- ✅ **Thinking Models Support**: Collapsible thinking process display for models that show their reasoning (like o1)
- ✅ **Keyboard Shortcuts**: 
  - `Enter`: Send message
  - `Shift + Enter`: New line
- ✅ **Auto-scroll**: Automatically scrolls to latest messages
- ✅ **Character Counter**: Input validation with character limit display
- ✅ **Connection Testing**: Test Ollama connectivity before chatting

### Technical Features
- ✅ **No Dependencies**: Pure vanilla JavaScript implementation
- ✅ **Local Storage**: Automatic configuration persistence
- ✅ **Accessibility**: Screen reader friendly with proper ARIA labels
- ✅ **Dark/Light Theme**: Automatic theme detection based on system preferences
- ✅ **Performance Optimized**: Efficient DOM manipulation and memory usage
- ✅ **Cross-browser Compatible**: Works on all modern browsers

## Quick Start

### Prerequisites
- A running Ollama instance (default: `http://localhost:11434`)
- At least one language model installed in Ollama
- A modern web browser

### Installation

1. **Clone or Download**: Get the CR Chatbot files
   ```bash
   git clone <repository-url>
   cd cr-chatbot
   ```

2. **Serve the Files**: Use any local web server
   ```bash
   # Option 1: Python (if installed)
   python -m http.server 8080
   
   # Option 2: Node.js (if installed)
   npx serve .
   
   # Option 3: Use VS Code Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

3. **Open in Browser**: Navigate to `http://localhost:8080`

4. **Configure**: Click the "Settings" button and configure your Ollama endpoint

### Configuration

1. **Open Settings**: Click the gear icon in the header
2. **Set Ollama URL**: Enter your Ollama endpoint (e.g., `http://localhost:11434`)
3. **Choose Model**: Specify the model name (e.g., `llama3.2`, `mistral`, `codellama`)
4. **System Prompt**: Customize the AI's behavior with a system prompt
5. **Test Connection**: Use the "Test Connection" button to verify setup
6. **Save**: Click "Save Configuration" to persist settings

## Usage Guide

### Starting a Conversation
1. Ensure Ollama is running and a model is available
2. Configure the endpoint in settings
3. Type your message in the input field
4. Press `Enter` or click the send button

### Managing Conversations
- **New Chat**: Click "New Chat" to start fresh
- **Clear Chat**: Remove all messages from current conversation
- **Save Conversation**: Export chat history to a text file

### Message Formatting
The chatbot supports basic markdown formatting:
- **Bold text**: `**bold**` → **bold**
- *Italic text*: `*italic*` → *italic*
- `Inline code`: `` `code` `` → `code`
- Code blocks: ``` ```code``` ``` → formatted code block

### Thinking Models Support
CR Chatbot automatically detects and handles thinking models (like o1) that include reasoning steps:
- **Automatic Detection**: Messages with `<think>` tags are automatically processed
- **Collapsible Display**: Thinking process is hidden by default in a collapsible section
- **Toggle Visibility**: Click "🤔 Thinking process" to expand and view the AI's reasoning
- **Clean Interface**: Only the final response is shown prominently, keeping the interface clean

### Keyboard Shortcuts
- `Enter`: Send message
- `Shift + Enter`: Add new line without sending
- `Ctrl/Cmd + /`: Focus message input (when available)

## File Structure

```
cr-chatbot/
├── index.html          # Main HTML file
├── styles.css          # Complete styling and theming
├── script.js           # Core JavaScript functionality
├── README.md           # This documentation
└── chatbot/           # Directory for saved conversations
    └── (saved files will appear here)
```

## Configuration Options

### Ollama Settings
- **Endpoint URL**: The base URL of your Ollama instance
- **Model Name**: The specific model to use for conversations
- **System Prompt**: Instructions that define the AI's behavior

### Default Configuration
```json
{
  "ollamaUrl": "http://localhost:11434",
  "modelName": "llama3.2",
  "systemPrompt": "You are a helpful AI assistant. Please provide accurate and concise responses."
}
```

## Troubleshooting

### Common Issues

**Connection Failed**
- Ensure Ollama is running: `ollama serve`
- Check the endpoint URL in settings
- Verify firewall settings allow connections
- Try the connection test in settings

**Model Not Found**
- List available models: `ollama list`
- Pull a model if needed: `ollama pull llama3.2`
- Check model name spelling in settings

**Interface Not Loading**
- Ensure you're serving files over HTTP (not file://)
- Check browser console for JavaScript errors
- Try a different browser or incognito mode

**Conversations Not Saving**
- Check browser permissions for downloads
- Ensure sufficient disk space
- Try a different browser if issues persist

### Ollama Setup

If you don't have Ollama installed:

1. **Install Ollama**: Visit [ollama.ai](https://ollama.ai) for installation instructions
2. **Start Ollama**: Run `ollama serve` in your terminal
3. **Pull a Model**: Download a model with `ollama pull llama3.2`
4. **Verify**: Test with `ollama run llama3.2 "Hello"`

## Browser Compatibility

CR Chatbot works on all modern browsers:
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Required Features
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Fetch API
- Local Storage
- File Download API

## Security Considerations

- **Local Communication**: All data stays between your browser and Ollama
- **No External Services**: No data sent to third-party servers
- **Local Storage**: Configuration stored locally in your browser
- **HTTPS Recommended**: Use HTTPS in production environments

## Performance

### Optimization Features
- **Efficient Rendering**: Only renders new messages, not entire conversation
- **Memory Management**: Proper cleanup of event listeners and references
- **Responsive Images**: SVG icons for crisp display at any size
- **Minimal Dependencies**: No external libraries to load

### Resource Usage
- **Memory**: ~2-5MB typical usage
- **Storage**: Configuration < 1KB, conversations vary by length
- **Network**: Only API calls to Ollama, no other external requests

## Customization

### Theming
The interface automatically adapts to your system's dark/light theme preference. Colors and spacing are defined using CSS custom properties for easy customization.

### Adding Features
The codebase is well-structured for adding new features:
- Event handling in `bindEvents()`
- UI updates in `updateUI()`
- API communication in `sendToOllama()`
- Message rendering in `renderMessage()`

## Development

### Code Structure
- **Class-based Architecture**: `CRChatbot` class encapsulates all functionality
- **Event-driven Design**: Clean separation of concerns
- **Modular Functions**: Each function has a single responsibility
- **Error Handling**: Comprehensive try-catch blocks with user feedback

### Testing Locally
1. Install VS Code with Live Server extension
2. Open the project folder in VS Code
3. Right-click `index.html` and select "Open with Live Server"
4. Test all functionality with a local Ollama instance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Coding Standards
- Use ES6+ features where appropriate
- Follow consistent naming conventions
- Add comments for complex logic
- Maintain responsive design principles
- Test on multiple browsers

## License

MIT License - feel free to use and modify for your projects.

## Support

For issues, questions, or contributions:
1. Check the troubleshooting section
2. Review the Ollama documentation
3. Open an issue with detailed information

## Changelog

### Version 1.0 (Current)
- ✅ Initial release
- ✅ Complete Ollama integration
- ✅ Professional UI design
- ✅ Conversation management
- ✅ Configuration system
- ✅ File export functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ Toast notifications

### Planned Features
- 🔄 Conversation history persistence
- 🔄 Multiple model support in single interface
- 🔄 Message export to different formats
- 🔄 Keyboard shortcut customization
- 🔄 Plugin system for extensions

---

**Developed by 3eekeeper** | CR Chatbot v1.0

*A simple, professional chatbot interface for Ollama that just works.*
