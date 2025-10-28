# Deployment Guide

This guide will help you deploy the Shape Tool Uploader to various free hosting platforms.

## Prerequisites

1. Your code should be in a Git repository (GitHub recommended)
2. Basic familiarity with Git commands

## 🚀 Option 1: Deploy to Render (Recommended)

Render offers free hosting with auto-deploy from GitHub.

### Steps:

1. **Push your code to GitHub** (if not already done):
```bash
cd /Users/haykkesh/Desktop/Projects/shape-tool-uploader
git init
git add .
git commit -m "Initial commit - Shape Tool Uploader"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/shape-tool-uploader.git
git branch -M main
git push -u origin main
```

2. **Deploy on Render**:
   - Go to https://render.com and sign up (free)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub account
   - Select your `shape-tool-uploader` repository
   
3. **Configure the service**:
   - **Name**: `shape-tool-uploader` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Select **"Free"**
   
4. **Click "Create Web Service"**

5. **Wait 2-3 minutes** for deployment to complete

6. **Your app will be live at**: `https://shape-tool-uploader.onrender.com`

### Notes:
- ✅ Free tier sleeps after 15 minutes of inactivity
- ✅ First request after sleep takes ~30 seconds to wake up
- ✅ Auto-deploys when you push to GitHub
- ✅ Free SSL certificate included

---

## 🚂 Option 2: Deploy to Railway

Railway offers $5/month free credits (enough for light usage).

### Steps:

1. **Push code to GitHub** (see above)

2. **Deploy on Railway**:
   - Go to https://railway.app
   - Sign up with GitHub
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository
   - Railway will auto-detect Node.js and deploy

3. **Generate domain**:
   - Go to your project → Settings → Generate Domain
   - Your app will be live at: `https://your-app.railway.app`

### Notes:
- ✅ No sleep/wake delays
- ✅ Auto-deploys from GitHub
- ⚠️ $5/month credits can run out with heavy usage

---

## ✈️ Option 3: Deploy to Fly.io

Fly.io offers 3 free VMs with good performance.

### Steps:

1. **Install Fly CLI**:
```bash
# On macOS:
brew install flyctl

# On Linux:
curl -L https://fly.io/install.sh | sh

# On Windows:
# Download from https://fly.io/docs/hands-on/install-flyctl/
```

2. **Login to Fly**:
```bash
flyctl auth login
```

3. **Launch your app**:
```bash
cd /Users/haykkesh/Desktop/Projects/shape-tool-uploader
flyctl launch
```

4. **Follow the prompts**:
   - App name: (your choice or press Enter for random)
   - Region: Choose closest to you
   - PostgreSQL: No
   - Redis: No
   - Deploy now: Yes

5. **Your app will be live at**: `https://your-app-name.fly.dev`

### Notes:
- ✅ No sleep/wake delays
- ✅ Good performance
- ⚠️ Requires credit card (won't charge on free tier)

---

## 🎨 Option 4: Deploy to Glitch (Quickest)

Perfect for quick testing and demos.

### Steps:

1. **Push code to GitHub** (see above)

2. **Import to Glitch**:
   - Go to https://glitch.com
   - Click **"New Project"** → **"Import from GitHub"**
   - Enter your GitHub repository URL
   - Click "OK"

3. **Your app is live immediately** at: `https://your-project-name.glitch.me`

### Notes:
- ✅ Easiest deployment
- ✅ Live code editor in browser
- ⚠️ Sleeps after 5 minutes of inactivity
- ⚠️ Limited resources

---

## 🔒 Environment Variables

All platforms will automatically set the `PORT` environment variable. The app is configured to use it automatically.

If you need to set custom environment variables:
- **Render**: Dashboard → Environment → Add Environment Variable
- **Railway**: Settings → Variables → Add Variable
- **Fly.io**: `flyctl secrets set KEY=value`
- **Glitch**: `.env` file (create it in the editor)

---

## 📁 Important Files for Deployment

These files are already configured in your project:

- ✅ `package.json` - Includes `engines` and `postinstall` script
- ✅ `.gitignore` - Excludes node_modules, dist, output files
- ✅ `Procfile` - For platforms that need it
- ✅ `render.yaml` - One-click deploy for Render
- ✅ `.env.example` - Template for environment variables

---

## 🧪 Testing Your Deployment

After deployment:

1. Visit your app URL
2. Upload a test SVG file with category name
3. Generate and download the output
4. Verify the transliteration works with Armenian filenames

---

## 🔄 Updating Your Deployment

For platforms with auto-deploy (Render, Railway):

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

The app will automatically redeploy in 2-3 minutes.

For Fly.io:
```bash
flyctl deploy
```

---

## 🆘 Troubleshooting

### App won't start
- Check build logs on your platform's dashboard
- Ensure `npm run build` completes successfully locally
- Verify Node version is 18.x or higher

### File uploads not working
- On free tiers, uploaded files are temporary
- They're stored in memory and deleted on restart
- This is normal behavior for free hosting

### App is slow to respond
- Free tiers sleep after inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier ($7-10/month) for always-on

---

## 💰 Cost Comparison

| Platform | Free Tier | Sleep? | Auto-Deploy | Best For |
|----------|-----------|--------|-------------|----------|
| Render | 750 hrs/mo | After 15min | ✅ | General use |
| Railway | $5 credits/mo | No | ✅ | Light use |
| Fly.io | 3 VMs | No | ❌ | Performance |
| Glitch | Unlimited | After 5min | ✅ | Quick demos |

---

## 🎯 Recommended Choice

**For most users**: Deploy to **Render**
- Easy setup
- Good free tier
- Auto-deploys from GitHub
- Free SSL certificate

**For always-on**: Upgrade any platform to paid tier (~$7/month)

---

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Review build/runtime logs in the dashboard
3. Ensure your GitHub repository is public (or grant access)

Happy deploying! 🚀

