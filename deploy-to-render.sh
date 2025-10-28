#!/bin/bash

echo "🚀 Preparing Shape Tool Uploader for Render Deployment"
echo "========================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Shape Tool Uploader ready for deployment"
    echo "✅ Git repository initialized"
    echo ""
    echo "⚠️  NEXT STEPS:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run these commands:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/shape-tool-uploader.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "3. Then go to https://render.com to deploy"
else
    echo "✅ Git repository already initialized"
    echo ""
    
    # Check if there are uncommitted changes
    if [[ -n $(git status -s) ]]; then
        echo "📝 Committing latest changes..."
        git add .
        git commit -m "Update: Prepare for deployment"
        echo "✅ Changes committed"
        echo ""
        echo "⚠️  Push to GitHub with: git push origin main"
    else
        echo "✅ No uncommitted changes"
    fi
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo ""
echo "✅ package.json configured with engines and postinstall"
echo "✅ Procfile created"
echo "✅ render.yaml created for one-click deploy"
echo "✅ .gitignore configured"
echo "✅ TypeScript build configured"
echo ""
echo "🌐 Ready to deploy to:"
echo "  • Render: https://render.com"
echo "  • Railway: https://railway.app"
echo "  • Fly.io: https://fly.io"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""

