#!/bin/bash

# CR Chatbot Release Script
# This script prepares the project for a new release

set -e

echo "🚀 CR Chatbot Release Preparation"
echo "================================="

# Check if version is provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a version number"
    echo "Usage: ./release.sh v1.0.0"
    exit 1
fi

VERSION=$1
echo "📦 Preparing release: $VERSION"

# Validate version format (allow alpha, beta, rc suffixes)
if [[ ! $VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?$ ]]; then
    echo "❌ Error: Version must be in format v1.0.0 or v1.0.0-alpha"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: Working directory is not clean"
    echo "Please commit or stash your changes first"
    git status --short
    exit 1
fi

# Update package.json version
echo "📝 Updating package.json version..."
if [ -f "package.json" ]; then
    # Remove 'v' prefix for package.json
    PACKAGE_VERSION=${VERSION#v}
    sed -i.bak "s/\"version\": \".*\"/\"version\": \"$PACKAGE_VERSION\"/" package.json
    rm package.json.bak
    echo "✅ Updated package.json to version $PACKAGE_VERSION"
else
    echo "⚠️  Warning: package.json not found"
fi

# Update README badges if needed
echo "📝 Updating README badges..."
if [ -f "README.md" ]; then
    sed -i.bak "s/GitHub%20Release-v[0-9]\+\.[0-9]\+\.[0-9]\+/GitHub%20Release-$VERSION/" README.md
    rm README.md.bak 2>/dev/null || true
fi

# Run basic checks
echo "🔍 Running pre-release checks..."

# Check if main files exist
REQUIRED_FILES=("cr-chatbot/index.html" "cr-chatbot/script.js" "cr-chatbot/styles.css" "README.md" "LICENSE")
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file $file is missing"
        exit 1
    fi
done
echo "✅ All required files present"

# Check for JavaScript syntax errors (basic check)
echo "🔍 Checking JavaScript syntax..."
if command -v node >/dev/null 2>&1; then
    node -c cr-chatbot/script.js
    echo "✅ JavaScript syntax check passed"
else
    echo "⚠️  Skipping JavaScript check (Node.js not installed)"
fi

# Check for HTML validation (basic check)
echo "🔍 Checking HTML structure..."
if command -v tidy >/dev/null 2>&1; then
    tidy -q -e cr-chatbot/index.html || echo "⚠️  HTML validation warnings (non-critical)"
else
    echo "⚠️  Skipping HTML check (tidy not installed)"
fi

# Create git tag
echo "🏷️  Creating git tag: $VERSION"
git add package.json README.md 2>/dev/null || true
git commit -m "chore: bump version to $VERSION" 2>/dev/null || echo "No changes to commit"
git tag -a "$VERSION" -m "Release $VERSION"

echo ""
echo "✅ Release preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push the changes: git push origin main --tags"
echo "2. Create a GitHub release at: https://github.com/3eekeeper/cr-chatbot/releases/new"
echo "3. Upload the release assets if needed"
echo "4. Update the GitHub Pages deployment"
echo ""
echo "🎉 Release $VERSION is ready!"
