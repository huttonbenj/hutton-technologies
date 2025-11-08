#!/bin/bash

echo "🚀 Hutton Technologies - Deployment Script"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit
echo "💾 Committing changes..."
read -p "Enter commit message (or press enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy Hutton Technologies"
fi
git commit -m "$commit_msg"

# Check if remote exists
if ! git remote | grep -q origin; then
    echo ""
    echo "⚠️  No git remote configured."
    echo "Please create a GitHub repository and run:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/hutton-technologies.git"
    echo "  git push -u origin main"
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://cloud.digitalocean.com/apps"
echo "2. Click 'Create App'"
echo "3. Connect your GitHub repository"
echo "4. Follow the DEPLOYMENT.md guide"
echo ""
echo "Your tokens are stored in .env.production (not committed to git)"
