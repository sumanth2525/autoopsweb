# Deployment Guide - Deploy Your App Online

Complete guide to deploying the Crime Analytics Dashboard to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest) ⭐

**Best for:** Next.js apps, free tier, automatic deployments

#### Steps:

1. **Prepare Your Code**
   ```bash
   # Make sure everything is committed
   git add .
   git commit -m "chore: prepare for deployment"
   git push origin main
   ```

2. **Sign Up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

3. **Deploy**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     FBI_API_KEY=DEMO_KEY
     NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
     ```
   - Redeploy

5. **Done!** Your app is live at `your-project.vercel.app`

**Pros:**
- ✅ Free tier
- ✅ Automatic deployments on git push
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Preview deployments for PRs

**Cons:**
- ❌ Serverless functions have time limits

---

### Option 2: Netlify

**Best for:** Static sites, JAMstack apps

#### Steps:

1. **Build Configuration**
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Select your repository
   - Build settings auto-detected
   - Click "Deploy site"

3. **Environment Variables**
   - Site Settings → Environment Variables
   - Add your variables
   - Redeploy

**Pros:**
- ✅ Free tier
- ✅ Easy setup
- ✅ Good for static sites

**Cons:**
- ❌ Next.js support requires plugin

---

### Option 3: Railway

**Best for:** Full-stack apps, databases

#### Steps:

1. **Sign Up**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects Next.js

3. **Environment Variables**
   - Variables tab
   - Add your environment variables
   - App redeploys automatically

**Pros:**
- ✅ Free tier with $5 credit
- ✅ Database support
- ✅ Full Docker support

**Cons:**
- ❌ Credit-based pricing after free tier

---

### Option 4: Render

**Best for:** Simple deployments, free tier

#### Steps:

1. **Sign Up**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy**
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Settings:
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
   - Click "Create Web Service"

3. **Environment Variables**
   - Environment tab
   - Add variables
   - Save changes

**Pros:**
- ✅ Free tier available
- ✅ Simple interface

**Cons:**
- ❌ Free tier spins down after inactivity

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All code is committed to Git
- [ ] `.env.local` is NOT committed (should be in `.gitignore`)
- [ ] Environment variables are documented
- [ ] Build passes locally: `npm run build`
- [ ] No console errors
- [ ] API keys are ready
- [ ] README is updated

## 🔧 Environment Variables Setup

### Required Variables

```env
# FBI API
FBI_API_KEY=DEMO_KEY
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api

# Optional: Database (if using)
DATABASE_URL=your_database_url
DATABASE_TYPE=postgresql
```

### How to Add in Each Platform

**Vercel:**
1. Project → Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save and redeploy

**Netlify:**
1. Site Settings → Environment Variables
2. Add variables
3. Save and redeploy

**Railway:**
1. Project → Variables tab
2. Add variables
3. Auto-redeploys

**Render:**
1. Environment tab
2. Add variables
3. Save changes

## 🌐 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. SSL certificate auto-provisioned

### Netlify

1. Site Settings → Domain Management
2. Add custom domain
3. Configure DNS
4. SSL auto-enabled

## 🔄 Continuous Deployment

### Automatic Deployments

All platforms support automatic deployments:

- **Push to main** → Deploys to production
- **Create PR** → Creates preview deployment
- **Merge PR** → Deploys to production

### Manual Deployment

If needed, you can trigger manual deployments from the platform dashboard.

## 📊 Monitoring & Analytics

### Add Monitoring

1. **Vercel Analytics** (Built-in)
   - Project Settings → Analytics
   - Enable Web Analytics

2. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   ```
   - Sign up at [sentry.io](https://sentry.io)
   - Follow setup instructions

3. **Google Analytics**
   - Add to `app/layout.tsx`
   - Get tracking ID from Google Analytics

## 🐛 Troubleshooting

### Build Fails

**Error:** `Module not found`
```bash
# Solution: Check all dependencies are in package.json
npm install
npm run build
```

**Error:** `Environment variable not found`
```bash
# Solution: Add all required env vars in platform settings
# Check .env.example for required variables
```

**Error:** `API route not working`
```bash
# Solution: Check API routes are in app/api/ directory
# Verify environment variables are set
```

### Deployment Issues

**App shows 404:**
- Check build completed successfully
- Verify start command is correct
- Check routing configuration

**API calls fail:**
- Verify environment variables are set
- Check CORS settings
- Verify API endpoints are correct

**Slow performance:**
- Enable caching
- Optimize images
- Check bundle size

## 🎯 Step-by-Step: Vercel Deployment

### Complete Walkthrough

1. **Prepare Repository**
   ```bash
   # Make sure you're on main branch
   git checkout main
   
   # Ensure everything is committed
   git status
   git add .
   git commit -m "chore: prepare for deployment"
   git push origin main
   ```

2. **Create Vercel Account**
   - Visit [vercel.com/signup](https://vercel.com/signup)
   - Sign up with GitHub (easiest)

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository
   - Click "Import"

4. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
   - Install Command: `npm install` (auto)

5. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
     - `FBI_API_KEY` = `DEMO_KEY`
     - `NEXT_PUBLIC_FBI_API_BASE_URL` = `https://api.usa.gov/crime/fbi/sapi/api`
   - Select: Production, Preview, Development
   - Click "Save"

6. **Deploy**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - See your live URL!

7. **Verify**
   - Visit your deployment URL
   - Test the application
   - Check connection tests page

## 📱 Mobile Testing

After deployment:

1. Test on mobile devices
2. Check responsive design
3. Verify API calls work
4. Test all features

## 🔐 Security Checklist

Before going live:

- [ ] No API keys in code
- [ ] Environment variables secured
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in commits
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] CORS configured if needed

## 📈 Post-Deployment

### What to Do After Deployment

1. **Test Everything**
   - All features work
   - API connections work
   - Mobile responsive
   - Error handling works

2. **Monitor**
   - Check error logs
   - Monitor performance
   - Watch for issues

3. **Share**
   - Share URL with team
   - Add to portfolio
   - Update README with live link

4. **Iterate**
   - Fix any issues
   - Add improvements
   - Deploy updates

## 🎓 Best Practices

### Deployment Best Practices

1. **Always test locally first**
   ```bash
   npm run build
   npm start
   ```

2. **Use preview deployments**
   - Test PRs before merging
   - Share preview links

3. **Monitor deployments**
   - Check build logs
   - Verify environment variables
   - Test after deployment

4. **Version control**
   - Tag releases
   - Document deployments
   - Keep changelog

## 🔗 Quick Links

- **Vercel:** [vercel.com](https://vercel.com)
- **Netlify:** [netlify.com](https://netlify.com)
- **Railway:** [railway.app](https://railway.app)
- **Render:** [render.com](https://render.com)

## 💡 Pro Tips

1. **Use Vercel for Next.js** - Best integration
2. **Enable preview deployments** - Test before production
3. **Set up monitoring** - Catch errors early
4. **Use custom domains** - Professional appearance
5. **Automate everything** - Git push = deploy

## 🚀 Quick Start Commands

### Vercel CLI (Alternative Method)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## ✅ Deployment Checklist

Before deploying:

- [ ] Code is committed and pushed
- [ ] Build passes locally
- [ ] Environment variables documented
- [ ] `.env.local` not committed
- [ ] README updated
- [ ] All features tested
- [ ] Mobile responsive verified
- [ ] Error handling tested

After deploying:

- [ ] App loads correctly
- [ ] All pages accessible
- [ ] API calls work
- [ ] Connection tests pass
- [ ] Mobile version works
- [ ] No console errors
- [ ] Performance is good

---

**Ready to deploy? Start with Vercel - it's the easiest for Next.js! 🚀**

