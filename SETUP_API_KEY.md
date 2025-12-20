# Quick Setup: Add FBI API Key

## ⚠️ Important Security Note

**DO NOT commit your actual API key to GitHub!** 
- API keys are secrets and should be kept private
- `.env.local` is already in `.gitignore` and will NOT be committed

## 🚀 Quick Setup Steps

### Step 1: Get Your API Key

1. Visit: https://api.data.gov/signup/
2. Sign up for a free account
3. Get your API key from the dashboard

### Step 2: Create .env.local (Local Development)

**Windows PowerShell:**
```powershell
@"
FBI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
"@ | Out-File -FilePath .env.local -Encoding utf8
```

**Or manually create `.env.local` file:**
```env
FBI_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
```

### Step 3: Add to Deployment Platform

#### For Netlify:
1. Go to Netlify Dashboard → Your Site → Site Settings
2. Click "Environment Variables"
3. Add:
   - Key: `FBI_API_KEY`, Value: `your_actual_api_key`
   - Key: `NEXT_PUBLIC_FBI_API_BASE_URL`, Value: `https://api.usa.gov/crime/fbi/sapi/api`
4. Save and redeploy

#### For Vercel:
1. Go to Vercel Dashboard → Your Project → Settings
2. Click "Environment Variables"
3. Add:
   - `FBI_API_KEY` = `your_actual_api_key`
   - `NEXT_PUBLIC_FBI_API_BASE_URL` = `https://api.usa.gov/crime/fbi/sapi/api`
4. Select all environments (Production, Preview, Development)
5. Save and redeploy

### Step 4: Verify

1. Restart dev server: `npm run dev`
2. Test the application
3. Check connection test page: `/test-connections`

## ✅ What Was Pushed to GitHub

- ✅ `.env.example` - Template file (no real keys)
- ✅ `ENV_SETUP.md` - Setup guide
- ✅ Documentation files

## ❌ What Was NOT Pushed (Correct!)

- ❌ `.env.local` - Your actual API key (protected by .gitignore)
- ❌ Any files with real secrets

## 🔒 Security Checklist

- [x] `.env.local` is in `.gitignore`
- [x] `.env.example` is a template (no real keys)
- [x] Actual API key is only in `.env.local` (local) and deployment platform (production)
- [x] No API keys in code or committed files

---

**Your API key is safe!** It's only stored locally and in your deployment platform's secure environment variables.

