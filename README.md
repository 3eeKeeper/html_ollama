# CR Chatbot

> A professional, clean web-based chatbot frontend for Ollama endpoints with thinking models support

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployment Ready](https://img.shields.io/badge/Deployment-Ready-brightgreen)](#-deployment-options)
[![Docker Support](https://img.shields.io/badge/Docker-Supported-blue)](./DOCKER.md)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-orange)](#-github-pages-deployment)

<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen" alt="Production Ready">
  <img src="https://img.shields.io/badge/No%20Dependencies-Vanilla%20JS-blue" alt="No Dependencies">
  <img src="https://img.shields.io/badge/Thinking%20Models-Supported-purple" alt="Thinking Models Support">
</div>

---

## 🚀 Live Demo

**Deploy your own**: Follow the [GitHub Deployment Guide](./GITHUB_DEPLOYMENT_GUIDE.md) to get your chatbot live in minutes!

*Configure with your own Ollama endpoint to start chatting!*

---

## ✨ Features

### 🎯 Core Features
- **🖥️ Professional UI**: Clean, modern interface with intuitive design
- **🔗 Ollama Integration**: Direct connection to any Ollama endpoint
- **💭 Thinking Models**: Special support for reasoning models (o1, etc.)
- **📝 Custom Prompts**: Personalized system prompts for different use cases
- **💾 Save Conversations**: Export chat history to text files
- **🌙 Dark/Light Theme**: Automatic theme detection
- **📱 Responsive Design**: Works perfectly on desktop and mobile

### 🧠 Thinking Models Support
- **Automatic Detection**: Recognizes `<think>` tags in responses
- **Collapsible Interface**: Thinking process hidden by default
- **🤔 One-Click Expand**: View AI reasoning on demand
- **Clean Display**: Main response shown prominently

### 🛠️ Technical Features
- **Zero Dependencies**: Pure vanilla HTML, CSS, and JavaScript
- **Local Storage**: Automatic configuration persistence
- **Real-time Status**: Connection monitoring with visual feedback
- **Error Handling**: Comprehensive error management
- **Accessibility**: Screen reader friendly with ARIA support
- **Cross-browser**: Works on all modern browsers

---

### Option 1: Local Setup
```bash
# Clone the repository
git clone https://github.com/3eekeeper/cr-chatbot.git
cd cr-chatbot

# Start local server
npm run dev
# or
cd cr-chatbot && python3 -m http.server 9000

# Open http://localhost:9000 in your browser
```

### Option 2: Docker (Recommended for Production)
```bash
# Using docker-compose (easiest)
git clone https://github.com/3eekeeper/cr-chatbot.git
cd cr-chatbot
docker-compose up -d

# Access at http://localhost:8080
```

Or using Docker directly:
```bash
# Build and run
docker build -t cr-chatbot .
docker run -d -p 8080:80 --name cr-chatbot cr-chatbot

# Access at http://localhost:8080
```

### Option 4: Download and Run
1. [Download the latest release](https://github.com/3eekeeper/cr-chatbot/releases)
2. Extract and open `cr-chatbot/index.html` in any HTTP server
3. Configure your Ollama endpoint and start chatting

---

## 🔧 Setup Guide

### Prerequisites
- **Ollama**: Running instance (default: `http://localhost:11434`)
- **Model**: At least one model installed (`ollama pull llama3.2`)
- **Browser**: Any modern web browser

### Configuration
1. **Open Settings**: Click the ⚙️ gear icon
2. **Set Endpoint**: Enter your Ollama URL (e.g., `http://localhost:11434`)
3. **Choose Model**: Specify model name (e.g., `llama3.2`, `mistral`)
4. **System Prompt**: Customize AI behavior (optional)
5. **Test Connection**: Verify setup works
6. **Start Chatting**: Send your first message!

---

## 💡 Usage Examples

### Basic Chat
```
User: Hello! How are you today?
AI: Hello! I'm doing well, thank you for asking. How can I assist you today?
```

### With Thinking Models (o1, etc.)
```
[🤔 Thinking process] ← Click to expand
AI: Based on your question, here's my response...
```

The thinking process is automatically detected and hidden in a collapsible section, keeping the interface clean while providing access to the AI's reasoning when desired.

### Markdown Support
- **Bold text**: `**bold**` → **bold**
- *Italic text*: `*italic*` → *italic*
- `Code`: `\`code\`` → `code`
- Code blocks: \`\`\`code\`\`\` → formatted blocks

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose
```bash
# Clone repository
git clone https://github.com/3eekeeper/cr-chatbot.git
cd cr-chatbot

# Start with docker-compose
docker-compose up -d

# Access at http://localhost:8080
```

### Manual Docker Build
```bash
# Build image
docker build -t cr-chatbot .

# Run container
docker run -d -p 8080:80 --name cr-chatbot cr-chatbot

# Access at http://localhost:8080
```

### Docker with Ollama
To run both CR Chatbot and Ollama together:
```bash
# Uncomment ollama service in docker-compose.yml
# Then run:
docker-compose up -d

# CR Chatbot: http://localhost:8080
# Ollama API: http://localhost:11434
```

### Production Deployment
```bash
# Build for production
docker build -t cr-chatbot:prod .

# Run with restart policy
docker run -d \
  --name cr-chatbot-prod \
  --restart unless-stopped \
  -p 80:80 \
  cr-chatbot:prod
```

---

## 🎨 Screenshots

### Main Interface
![CR Chatbot Interface](https://via.placeholder.com/800x500/2563eb/ffffff?text=CR+Chatbot+Interface)

### Thinking Models
![Thinking Process](https://via.placeholder.com/800x300/8B4513/ffffff?text=Collapsible+Thinking+Process)

### Settings Panel
![Settings](https://via.placeholder.com/600x400/059669/ffffff?text=Configuration+Panel)

---

## 🗂️ Project Structure

```
cr-chatbot/
├── index.html              # Main application file
├── styles.css              # Complete styling and theming
├── script.js               # Core JavaScript functionality
├── README.md               # Detailed documentation
├── chatbot/               # Saved conversations directory
├── THINKING_MODELS_FEATURE.md  # Thinking models documentation
└── PROJECT_COMPLETION.md   # Development completion summary
```

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 80+ | ✅ Fully Supported |
| Firefox | 75+ | ✅ Fully Supported |
| Safari  | 13+ | ✅ Fully Supported |
| Edge    | 80+ | ✅ Fully Supported |
| Mobile  | Modern | ✅ Responsive Design |

---

## 🔧 API Reference

### Ollama Integration
The chatbot communicates with Ollama using the standard API:

```javascript
// POST /api/chat
{
  "model": "llama3.2",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "stream": false
}
```

### Thinking Models Format
For models that support reasoning:
```
<think>
This is the AI's internal reasoning process...
</think>

This is the final response shown to the user.
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development
```bash
# Clone your fork
git clone https://github.com/yourusername/cr-chatbot.git
cd cr-chatbot

# Start development server
npm run dev

# Make changes and test at http://localhost:9000
```

---

## 📋 Roadmap

### Version 1.1 (Planned)
- [ ] Conversation history persistence
- [ ] Multiple model support in single interface
- [ ] Message export to different formats (JSON, Markdown)
- [ ] Keyboard shortcut customization
- [ ] Plugin system for extensions

### Version 1.2 (Future)
- [ ] Voice input/output support
- [ ] Multi-language UI
- [ ] Advanced model parameter controls
- [ ] Conversation templates
- [ ] Integration with cloud AI services

---

## 🆘 Troubleshooting

### Common Issues

**"Connection Failed"**
- Ensure Ollama is running: `ollama serve`
- Check endpoint URL in settings
- Verify firewall allows connections

**"Model Not Found"**
- List available models: `ollama list`
- Pull required model: `ollama pull llama3.2`

**Interface Not Loading**
- Use HTTP server (not file:// protocol)
- Check browser console for errors
- Try different browser or incognito mode

### Getting Help
- 📖 [Documentation](cr-chatbot/README.md)
- 🐛 [Issue Tracker](https://github.com/3eekeeper/cr-chatbot/issues)
- 💬 [Discussions](https://github.com/3eekeeper/cr-chatbot/discussions)

---

## 📊 Performance

- **Memory Usage**: ~2-5MB typical
- **Storage**: Configuration < 1KB
- **Load Time**: < 1 second on modern connections
- **Responsiveness**: 60fps animations

---

## 🔒 Security

- **Local Communication**: All data stays between browser and Ollama
- **No External Services**: No third-party data collection
- **Local Storage**: Configuration stored locally only
- **HTTPS Ready**: Works with secure connections

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ollama Team**: For the excellent local AI platform
- **Contributors**: Everyone who helps improve CR Chatbot
- **Community**: Users who provide feedback and suggestions

---

## 📈 Stats

![GitHub Stars](https://img.shields.io/github/stars/3eekeeper/cr-chatbot?style=social)
![GitHub Forks](https://img.shields.io/github/forks/3eekeeper/cr-chatbot?style=social)
![GitHub Watchers](https://img.shields.io/github/watchers/3eekeeper/cr-chatbot?style=social)

---

<div align="center">

**Made with ❤️ by [3eekeeper](https://github.com/3eekeeper)**

*A simple, professional chatbot interface that just works.*

[⭐ Star this repo](https://github.com/3eekeeper/cr-chatbot) | [🐛 Report Bug](https://github.com/3eekeeper/cr-chatbot/issues) | [✨ Request Feature](https://github.com/3eekeeper/cr-chatbot/issues)

</div>
