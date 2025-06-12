/**
 * CR Chatbot - JavaScript Implementation
 * Developed by 3eekeeper
 * 
 * A professional web-based chatbot frontend for Ollama endpoints
 */

class CRChatbot {
    constructor() {
        this.config = {
            ollamaUrl: 'http://localhost:11434',
            modelName: 'llama3.2',
            systemPrompt: 'You are a helpful AI assistant. Please provide accurate and concise responses.'
        };
        
        this.conversation = [];
        this.isConnected = false;
        this.isProcessing = false;
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.loadConfig();
        this.bindEvents();
        this.updateUI();
        this.autoResizeTextarea();
    }
    
    /**
     * Load configuration from localStorage
     */
    loadConfig() {
        const savedConfig = localStorage.getItem('cr-chatbot-config');
        if (savedConfig) {
            try {
                this.config = { ...this.config, ...JSON.parse(savedConfig) };
            } catch (error) {
                console.error('Failed to load config:', error);
                this.showToast('Warning', 'Failed to load saved configuration', 'warning');
            }
        }
    }
    
    /**
     * Save configuration to localStorage
     */
    saveConfig() {
        try {
            localStorage.setItem('cr-chatbot-config', JSON.stringify(this.config));
            this.showToast('Success', 'Configuration saved successfully', 'success');
        } catch (error) {
            console.error('Failed to save config:', error);
            this.showToast('Error', 'Failed to save configuration', 'error');
        }
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Configuration panel
        document.getElementById('configBtn').addEventListener('click', () => this.openConfigPanel());
        document.getElementById('closeConfigBtn').addEventListener('click', () => this.closeConfigPanel());
        document.getElementById('saveConfigBtn').addEventListener('click', () => this.handleSaveConfig());
        document.getElementById('testConnectionBtn').addEventListener('click', () => this.testConnection());
        
        // Chat controls
        document.getElementById('newChatBtn').addEventListener('click', () => this.newConversation());
        document.getElementById('clearChatBtn').addEventListener('click', () => this.clearChat());
        document.getElementById('saveChatBtn').addEventListener('click', () => this.saveConversation());
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        
        // Input handling
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        messageInput.addEventListener('input', () => this.handleInputChange());
        
        // Close config panel on overlay click
        document.getElementById('configPanel').addEventListener('click', (e) => {
            if (e.target.id === 'configPanel') {
                this.closeConfigPanel();
            }
        });
        
        // Auto-focus message input
        messageInput.focus();
    }
    
    /**
     * Handle keyboard input
     */
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                // Allow new line with Shift+Enter
                return;
            } else {
                // Send message with Enter
                event.preventDefault();
                this.sendMessage();
            }
        }
    }
    
    /**
     * Handle input changes
     */
    handleInputChange() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const charCount = document.getElementById('charCount');
        
        // Update character count
        charCount.textContent = messageInput.value.length;
        
        // Enable/disable send button
        const hasText = messageInput.value.trim().length > 0;
        sendBtn.disabled = !hasText || this.isProcessing;
        
        // Auto-resize textarea
        this.autoResizeTextarea();
    }
    
    /**
     * Auto-resize textarea based on content
     */
    autoResizeTextarea() {
        const messageInput = document.getElementById('messageInput');
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
    }
    
    /**
     * Open configuration panel
     */
    openConfigPanel() {
        const configPanel = document.getElementById('configPanel');
        const ollamaUrl = document.getElementById('ollamaUrl');
        const modelName = document.getElementById('modelName');
        const systemPrompt = document.getElementById('systemPrompt');
        
        // Populate current values
        ollamaUrl.value = this.config.ollamaUrl;
        modelName.value = this.config.modelName;
        systemPrompt.value = this.config.systemPrompt;
        
        configPanel.classList.add('open');
        ollamaUrl.focus();
    }
    
    /**
     * Close configuration panel
     */
    closeConfigPanel() {
        const configPanel = document.getElementById('configPanel');
        configPanel.classList.remove('open');
    }
    
    /**
     * Handle save configuration
     */
    handleSaveConfig() {
        const ollamaUrl = document.getElementById('ollamaUrl').value.trim();
        const modelName = document.getElementById('modelName').value.trim();
        const systemPrompt = document.getElementById('systemPrompt').value.trim();
        
        // Validate inputs
        if (!ollamaUrl) {
            this.showToast('Error', 'Ollama URL is required', 'error');
            return;
        }
        
        if (!modelName) {
            this.showToast('Error', 'Model name is required', 'error');
            return;
        }
        
        // Update configuration
        this.config.ollamaUrl = ollamaUrl;
        this.config.modelName = modelName;
        this.config.systemPrompt = systemPrompt || 'You are a helpful AI assistant.';
        
        this.saveConfig();
        this.closeConfigPanel();
        this.updateConnectionStatus();
    }
    
    /**
     * Test connection to Ollama
     */
    async testConnection() {
        const testBtn = document.getElementById('testConnectionBtn');
        const originalText = testBtn.textContent;
        
        testBtn.disabled = true;
        testBtn.textContent = 'Testing...';
        
        try {
            const ollamaUrl = document.getElementById('ollamaUrl').value.trim() || this.config.ollamaUrl;
            const response = await fetch(`${ollamaUrl}/api/tags`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                this.isConnected = true;
                this.updateConnectionStatus();
                this.showToast('Success', `Connected successfully! Found ${data.models?.length || 0} models.`, 'success');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            this.isConnected = false;
            this.updateConnectionStatus();
            this.showToast('Connection Failed', `Unable to connect to Ollama: ${error.message}`, 'error');
        } finally {
            testBtn.disabled = false;
            testBtn.textContent = originalText;
        }
    }
    
    /**
     * Update connection status in UI
     */
    updateConnectionStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        if (this.isConnected) {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'Connected';
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = 'Disconnected';
        }
    }
    
    /**
     * Send message to Ollama
     */
    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message || this.isProcessing) return;
        
        // Add user message to conversation
        this.addMessage('user', message);
        
        // Clear input
        messageInput.value = '';
        this.handleInputChange();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            this.isProcessing = true;
            await this.sendToOllama(message);
        } catch (error) {
            this.showToast('Error', `Failed to send message: ${error.message}`, 'error');
            this.addMessage('assistant', 'Sorry, I encountered an error while processing your message. Please check your connection and try again.');
        } finally {
            this.isProcessing = false;
            this.hideTypingIndicator();
            this.updateUI();
            messageInput.focus();
        }
    }
    
    /**
     * Send message to Ollama API
     */
    async sendToOllama(message) {
        // Prepare messages for the API
        const messages = [];
        
        // Add system prompt if configured
        if (this.config.systemPrompt) {
            messages.push({
                role: 'system',
                content: this.config.systemPrompt
            });
        }
        
        // Add conversation history
        messages.push(...this.conversation.map(msg => ({
            role: msg.role,
            content: msg.content
        })));
        
        const requestBody = {
            model: this.config.modelName,
            messages: messages,
            stream: false,
            options: {
                temperature: 0.7,
                top_p: 0.9,
                top_k: 40
            }
        };
        
        const response = await fetch(`${this.config.ollamaUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.message && data.message.content) {
            this.addMessage('assistant', data.message.content);
            this.isConnected = true;
            this.updateConnectionStatus();
        } else {
            throw new Error('Invalid response format from Ollama');
        }
    }
    
    /**
     * Add message to conversation and display
     */
    addMessage(role, content) {
        const timestamp = new Date();
        const message = {
            role,
            content,
            timestamp
        };
        
        this.conversation.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }
    
    /**
     * Render a single message
     */
    renderMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        
        // Hide welcome message
        const welcomeMessage = chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'none';
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.role}`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        
        const textElement = document.createElement('div');
        textElement.className = 'message-text';
        textElement.innerHTML = this.formatMessageContent(message.content);
        
        const timestampElement = document.createElement('div');
        timestampElement.className = 'message-timestamp';
        timestampElement.textContent = this.formatTimestamp(message.timestamp);
        
        contentElement.appendChild(textElement);
        contentElement.appendChild(timestampElement);
        messageElement.appendChild(contentElement);
        
        chatMessages.appendChild(messageElement);
        
        // Add event listeners for thinking toggle buttons
        const thinkingToggles = messageElement.querySelectorAll('.thinking-toggle');
        thinkingToggles.forEach(toggle => {
            toggle.addEventListener('click', this.toggleThinkingContent.bind(this));
        });
    }
    
    /**
     * Format message content (basic markdown-like formatting and thinking process)
     */
    formatMessageContent(content) {
        // Check for thinking process tags
        const thinkingRegex = /<think>([\s\S]*?)<\/think>/g;
        let thinkingContent = '';
        let mainContent = content;
        
        // Extract thinking process if present
        const thinkingMatches = content.match(thinkingRegex);
        if (thinkingMatches) {
            // Extract all thinking content
            thinkingMatches.forEach(match => {
                const thinkContent = match.replace(/<think>([\s\S]*?)<\/think>/g, '$1').trim();
                thinkingContent += thinkContent + '\n\n';
            });
            
            // Remove thinking tags from main content
            mainContent = content.replace(thinkingRegex, '').trim();
        }
        
        // Escape HTML for main content
        mainContent = mainContent.replace(/[<>&]/g, function(c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c];
        });
        
        // Format code blocks
        mainContent = mainContent.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Format inline code
        mainContent = mainContent.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Format bold text
        mainContent = mainContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format italic text
        mainContent = mainContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert line breaks
        mainContent = mainContent.replace(/\n/g, '<br>');
        
        // If there's thinking content, add the collapsible thinking section
        if (thinkingContent) {
            const thinkingId = 'thinking-' + utils.generateId();
            
            // Escape HTML for thinking content
            const escapedThinkingContent = thinkingContent.replace(/[<>&]/g, function(c) {
                return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c];
            }).replace(/\n/g, '<br>');
            
            const thinkingHtml = `
                <div class="thinking-section">
                    <button class="thinking-toggle" data-thinking-id="${thinkingId}">
                        <svg class="thinking-icon" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z"/>
                        </svg>
                        <span class="thinking-label">Thinking process</span>
                    </button>
                    <div class="thinking-content" id="${thinkingId}" style="display: none;">
                        ${escapedThinkingContent}
                    </div>
                </div>
            `;
            
            return thinkingHtml + mainContent;
        }
        
        return mainContent;
    }
    
    /**
     * Toggle thinking content visibility
     */
    toggleThinkingContent(event) {
        const button = event.currentTarget;
        const thinkingId = button.getAttribute('data-thinking-id');
        const thinkingContent = document.getElementById(thinkingId);
        const icon = button.querySelector('.thinking-icon');
        
        if (thinkingContent) {
            const isVisible = thinkingContent.style.display !== 'none';
            thinkingContent.style.display = isVisible ? 'none' : 'block';
            icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
        }
    }
    
    /**
     * Format timestamp
     */
    formatTimestamp(timestamp) {
        return timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.add('show');
        this.scrollToBottom();
    }
    
    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.remove('show');
    }
    
    /**
     * Scroll chat to bottom
     */
    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
    
    /**
     * Clear current chat
     */
    clearChat() {
        if (this.conversation.length === 0) return;
        
        if (confirm('Are you sure you want to clear the current conversation?')) {
            this.newConversation();
        }
    }
    
    /**
     * Start new conversation
     */
    newConversation() {
        this.conversation = [];
        this.renderConversation();
        this.showToast('Info', 'Started new conversation', 'success');
    }
    
    /**
     * Render entire conversation
     */
    renderConversation() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-content">
                    <svg class="welcome-icon" viewBox="0 0 24 24" width="48" height="48">
                        <path fill="currentColor" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M9 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-3 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/>
                    </svg>
                    <h2>Welcome to CR Chatbot</h2>
                    <p>Configure your Ollama endpoint in the settings and start chatting!</p>
                </div>
            </div>
        `;
        
        // Render all messages
        this.conversation.forEach(message => this.renderMessage(message));
    }
    
    /**
     * Save conversation to file
     */
    saveConversation() {
        if (this.conversation.length === 0) {
            this.showToast('Info', 'No conversation to save', 'warning');
            return;
        }
        
        const timestamp = new Date();
        const filename = `cr-chatbot-conversation-${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')}-${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}.txt`;
        
        let content = `CR Chatbot Conversation\n`;
        content += `Saved: ${timestamp.toLocaleString()}\n`;
        content += `Model: ${this.config.modelName}\n`;
        content += `Endpoint: ${this.config.ollamaUrl}\n`;
        content += `System Prompt: ${this.config.systemPrompt}\n`;
        content += `\n${'='.repeat(50)}\n\n`;
        
        this.conversation.forEach((message, index) => {
            const role = message.role === 'user' ? 'User' : 'Assistant';
            const time = message.timestamp.toLocaleString();
            content += `[${index + 1}] ${role} (${time}):\n`;
            content += `${message.content}\n\n`;
        });
        
        content += `\n${'='.repeat(50)}\n`;
        content += `End of conversation - ${this.conversation.length} messages total\n`;
        content += `Generated by CR Chatbot v1.0 - Developed by 3eekeeper\n`;
        
        this.downloadFile(filename, content);
        this.showToast('Success', 'Conversation saved successfully', 'success');
    }
    
    /**
     * Download file
     */
    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
    
    /**
     * Show toast notification
     */
    showToast(title, message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
            warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
            info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="${iconMap[type]}"/>
                    </svg>
                </div>
                <div class="toast-text">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
            </div>
            <button class="toast-close">
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        `;
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });
        
        toastContainer.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }
    
    /**
     * Update UI state
     */
    updateUI() {
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        
        sendBtn.disabled = this.isProcessing || messageInput.value.trim().length === 0;
        
        // Update save button state
        const saveChatBtn = document.getElementById('saveChatBtn');
        saveChatBtn.disabled = this.conversation.length === 0;
        
        // Update clear button state
        const clearChatBtn = document.getElementById('clearChatBtn');
        clearChatBtn.disabled = this.conversation.length === 0;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.crChatbot = new CRChatbot();
});

// Utility functions for potential future use
const utils = {
    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Copy text to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    },
    
    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    /**
     * Sanitize HTML
     */
    sanitizeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};
