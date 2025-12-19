# Quick Deploy Guide - 5 Minutes

## 🚀 Fastest Way: Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

### Step 3: Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add:
   - `FBI_API_KEY` = `DEMO_KEY`
   - `NEXT_PUBLIC_FBI_API_BASE_URL` = `https://api.usa.gov/crime/fbi/sapi/api`
3. Redeploy

### Step 4: Done! 🎉
Your app is live at `your-project.vercel.app`

---

## Alternative: Netlify

### Step 1: Push to GitHub
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

### Step 3: Add Environment Variables
1. Site Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## Pre-Deployment Checklist

- [ ] Code is committed to Git
- [ ] `.env.local` is NOT committed
- [ ] Build works: `npm run build`
- [ ] No errors in console

---

## Troubleshooting

**Build fails?**
- Check all dependencies: `npm install`
- Verify environment variables are set
- Check build logs for errors

**App not working?**
- Verify environment variables
- Check API endpoints
- Test locally first: `npm run build && npm start`

---

**Need more details?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

