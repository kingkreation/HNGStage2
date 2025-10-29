# Deployment Guide

This guide walks you through deploying each version of the ticket app to its recommended platform. I've tested all these steps myself, so they should work smoothly.

## Overview

- **React app** → Vercel (best for React/Vite apps)
- **Vue app** → Netlify (great for static sites)
- **Twig app** → Render (supports Docker for PHP apps)

## Prerequisites

Before you start, make sure you have:
- A GitHub account
- Your code pushed to a GitHub repository
- Accounts on Vercel, Netlify, and Render (all have free tiers)

## Important: Monorepo Setup

This project has all three apps in one repository (monorepo). When deploying:

- **For React**: Set the **root directory** or **base directory** to `react-app` in your platform settings
- **For Vue**: Set the **root directory** or **base directory** to `vue-app`
- **For Twig**: Set the **root directory** or **base directory** to `twig-app`

Most platforms will ask for this during setup. If you forget, the build will fail because it won't find the package.json or Dockerfile. Don't worry - you can update it in settings afterward!

---

## Deploying React App to Vercel

Vercel is built by the creators of Next.js and works perfectly with Vite React apps.

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** if you haven't already:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and use your GitHub account

3. **Import your project**:
   - Click "Add New" → "Project"
   - Vercel will show your GitHub repositories
   - Select your repo

4. **Configure build settings**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for the build to complete
   - Vercel will give you a live URL like `your-app.vercel.app`

6. **Done!** Every time you push to GitHub, Vercel automatically redeploys.

### Option 2: Deploy via Vercel CLI

If you prefer the command line:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to react-app directory
cd react-app

# Deploy
vercel

# Follow the prompts
# For production deployment
vercel --prod
```

### Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your domain's DNS records as instructed
5. Vercel automatically provisions SSL

### Testing Your Deployment

Visit your deployed URL and verify:
- Landing page loads correctly
- Can login with demo@ticketapp.test / Password123!
- Dashboard shows ticket stats
- Can create, edit, and delete tickets
- All routes work (refresh on `/dashboard` shouldn't 404)

---

## Deploying Vue App to Netlify

Netlify is perfect for static sites and has great support for Vue/Vite apps.

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** if needed:
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push origin main
   ```

2. **Sign up for Netlify**:
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Sign Up" and use your GitHub account

3. **Create a new site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repos
   - Select your repository

4. **Configure build settings**:
   - **Branch to deploy**: main
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `vue-app` (if deploying from monorepo)

5. **Deploy**:
   - Click "Deploy site"
   - Netlify builds and deploys in 2-3 minutes
   - You'll get a URL like `random-name-123.netlify.app`

6. **Done!** Netlify auto-deploys whenever you push to GitHub.

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to vue-app directory
cd vue-app

# Build the project
npm run build

# Login to Netlify
netlify login

# Deploy
netlify init

# Follow the prompts to link your site
# Then deploy
netlify deploy --prod
```

### Option 3: Drag and Drop (Quick Test)

If you just want to test quickly:

1. Run `npm run build` in the vue-app directory
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist` folder into the browser
4. Get an instant preview (but you'll need to redeploy manually for updates)

### Rename Your Site

1. Go to Netlify dashboard
2. Click "Site settings"
3. Under "Site information", click "Change site name"
4. Choose a better name like `your-name-ticket-app`

### Custom Domain (Optional)

1. Go to "Domain settings" in your site dashboard
2. Click "Add custom domain"
3. Follow instructions to update your DNS
4. Netlify provides free SSL automatically

### Testing Your Deployment

Check that:
- Landing page renders properly
- Login works with demo credentials
- Routes don't 404 on refresh (the netlify.toml handles this)
- All CRUD operations work
- Mobile responsive layout works

---

## Deploying Twig App to Render

Render supports PHP through Docker, which is what I've set up for the Twig app.

### Prerequisites

Make sure these files exist in your twig-app folder:
- `Dockerfile` ✓
- `conf/nginx-site.conf` ✓
- `.dockerignore` ✓

I've already added these, so you should be good to go.

### Deploy Steps

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

3. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Click "Connect account" to link GitHub
   - Select your repository

4. **Configure the service**:
   - **Name**: ticket-app-twig (or whatever you prefer)
   - **Environment**: Docker
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Instance Type**: Free (or Starter if you want always-on)

5. **Advanced settings** (optional):
   - Environment variables (if you need any)
   - Auto-deploy: Yes (enabled by default)

6. **Deploy**:
   - Click "Create Web Service"
   - Render will:
     - Build the Docker image
     - Run composer install
     - Start nginx and PHP-FPM
     - Give you a URL like `https://ticket-app-twig.onrender.com`

7. **Wait for the build**:
   - First build takes 5-10 minutes
   - Watch the logs to see progress
   - You'll see "Your service is live" when it's ready

### Important Note About Free Tier

Render's free tier spins down after 15 minutes of inactivity. The first request after it spins down will be slow (30-50 seconds) while it wakes up. For always-on service, upgrade to the Starter plan ($7/month).

### Troubleshooting

**"Build failed"**:
- Check the logs in Render dashboard
- Make sure `composer.json` and `composer.lock` are committed
- Verify the Dockerfile is in the twig-app directory

**"502 Bad Gateway"**:
- Check the service logs for PHP errors
- Make sure nginx is configured correctly
- Verify the `public` directory exists

**"Composer install failed"**:
- Make sure composer.lock is committed to git
- Check that all dependencies are compatible

### Testing Your Deployment

1. Visit your Render URL
2. Check that:
   - Landing page loads
   - Can login with demo credentials
   - Dashboard shows correct stats
   - Can create/edit/delete tickets
   - Sessions persist across page loads

---

## General Tips

### Environment Variables

If you need to add API keys or secrets:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & deploy → Environment
- **Render**: Dashboard → Environment

### Rollback

All three platforms let you rollback to previous deployments:

- **Vercel**: Deployments tab → Click old deployment → Promote to production
- **Netlify**: Deploys tab → Click old deploy → Publish deploy
- **Render**: Manual Deploys tab → Redeploy a previous version

### Monitoring

Check your deployment status:

- **Vercel**: Real-time logs in dashboard
- **Netlify**: Deploy logs show build output
- **Render**: Logs tab shows runtime logs

### Costs

All three platforms offer generous free tiers:

- **Vercel**: Free for personal projects, unlimited bandwidth
- **Netlify**: 100GB bandwidth/month free
- **Render**: Free tier with some limitations (spins down)

For this project, the free tiers are more than enough.

---

## Common Issues and Solutions

### React/Vue routes return 404 on refresh

**Solution**: The `vercel.json` and `netlify.toml` files handle this with rewrites/redirects. Make sure these files are committed.

### Twig app shows "Application error"

**Solution**: Check Render logs for PHP errors. Usually it's a missing composer dependency or wrong file permissions.

### Build fails with "Module not found"

**Solution**: Run `npm install` locally first to regenerate package-lock.json, then commit it.

### Changes not showing on deployed site

**Solution**: 
- Clear your browser cache
- Check deployment logs to make sure build succeeded
- Verify the right branch is being deployed

---

## Next Steps After Deployment

Once all three apps are deployed:

1. Test each thoroughly
2. Update your HNG submission with all three live URLs
3. Consider adding custom domains if you have them
4. Set up monitoring/analytics if needed
5. Share the URLs with the HNG team

Good luck with your deployments! If you run into issues, check the platform documentation or reach out for help.

---

**Joshua Kolawole** | HNG Stage 2
