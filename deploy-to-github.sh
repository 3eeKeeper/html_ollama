#!/bin/bash

# 🚀 CR Chatbot - GitHub Deployment Script
# This script helps you deploy your CR Chatbot to GitHub Pages

echo "🚀 CR Chatbot - GitHub Deployment Helper"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -d "cr-chatbot" ]; then
    echo "❌ Error: Please run this script from the cr-chatbot project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a git repository. Please initialize git first."
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Get user input for GitHub repository
echo "📝 Please provide your GitHub repository information:"
echo ""
read -p "GitHub Username: " github_username
read -p "Repository Name (default: cr-chatbot): " repo_name

# Set default repository name if not provided
if [ -z "$repo_name" ]; then
    repo_name="cr-chatbot"
fi

# Construct repository URL
repo_url="https://github.com/${github_username}/${repo_name}.git"

echo ""
echo "🔗 Repository URL: $repo_url"
echo ""

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Remote 'origin' already exists. Current URL:"
    git remote get-url origin
    echo ""
    read -p "Do you want to update it? (y/N): " update_remote
    if [[ $update_remote =~ ^[Yy]$ ]]; then
        git remote set-url origin "$repo_url"
        echo "✅ Remote URL updated"
    else
        echo "❌ Deployment cancelled"
        exit 1
    fi
else
    git remote add origin "$repo_url"
    echo "✅ Remote added"
fi

echo ""

# Check git status
echo "📋 Current git status:"
git status --short
echo ""

# Commit any uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    git commit -m "Final deployment preparation - ready for GitHub Pages"
    echo "✅ Changes committed"
else
    echo "✅ All changes already committed"
fi

echo ""

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your code has been pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/${github_username}/${repo_name}"
    echo "2. Click on 'Settings' tab"
    echo "3. Scroll to 'Pages' section in the sidebar"
    echo "4. Under 'Source', select 'GitHub Actions'"
    echo "5. Wait 2-3 minutes for deployment to complete"
    echo ""
    echo "🌐 Your chatbot will be live at:"
    echo "   https://${github_username}.github.io/${repo_name}/"
    echo ""
    echo "📚 Additional Resources:"
    echo "   • Full guide: ./GITHUB_DEPLOYMENT_GUIDE.md"
    echo "   • Docker setup: ./DOCKER.md"
    echo "   • Contributing: ./CONTRIBUTING.md"
    echo ""
    echo "🎊 Congratulations! Your CR Chatbot is now public and ready for the world!"
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo "📋 Common solutions:"
    echo "1. Make sure the repository exists on GitHub"
    echo "2. Check your GitHub authentication"
    echo "3. Verify the repository URL is correct"
    echo "4. Try running: git remote -v"
    exit 1
fi
