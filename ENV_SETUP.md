# Environment Variables Setup Guide

## ⚠️ IMPORTANT: Never Commit API Keys to GitHub!

API keys and secrets should **NEVER** be committed to Git. They should be:
- Stored in `.env.local` (local development) - already in `.gitignore`
- Added as environment variables in deployment platforms (Netlify, Vercel, etc.)

## 🔑 FBI API Key Setup

### For Local Development

1. **Create `.env.local` file** (if it doesn't exist):
   ```bash
   # This file is already in .gitignore and will NOT be committed
   ```

2. **Add your API key to `.env.local`**:
   ```env
   FBI_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
   ```

3. **Get your API key:**
   - Visit: https://api.data.gov/signup/
   - Sign up for a free account
   - Get your API key
   - Replace `DEMO_KEY` with your actual key

### For Deployment (Netlify/Vercel)

#### Netlify:
1. Go to Site Settings → Environment Variables
2. Add:
   - Key: `FBI_API_KEY`
   - Value: `your_actual_api_key`
   - Key: `NEXT_PUBLIC_FBI_API_BASE_URL`
   - Value: `https://api.usa.gov/crime/fbi/sapi/api`
3. Save and redeploy

#### Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   - `FBI_API_KEY` = `your_actual_api_key`
   - `NEXT_PUBLIC_FBI_API_BASE_URL` = `https://api.usa.gov/crime/fbi/sapi/api`
3. Select environments (Production, Preview, Development)
4. Save and redeploy

## ✅ What's Safe to Commit

- ✅ `.env.example` - Template file (no real keys)
- ✅ `next.config.js` - Configuration (uses env vars)
- ✅ Code files

## ❌ What's NOT Safe to Commit

- ❌ `.env.local` - Contains real API keys (already in .gitignore)
- ❌ `.env` - Contains secrets (already in .gitignore)
- ❌ Any file with actual API keys or passwords

## 🔍 Verify Your Setup

### Check .gitignore:
```bash
# Should include:
.env*.local
.env
```

### Verify .env.local is ignored:
```bash
git status
# .env.local should NOT appear in the list
```

## 📝 Quick Setup Commands

### Create .env.local (Windows PowerShell):
```powershell
@"
FBI_API_KEY=your_api_key_here
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
"@ | Out-File -FilePath .env.local -Encoding utf8
```

### Create .env.local (Linux/Mac):
```bash
cat > .env.local << EOF
FBI_API_KEY=your_api_key_here
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
EOF
```

## 🚀 After Setup

1. Restart your dev server: `npm run dev`
2. Test the API connection
3. Add environment variables to your deployment platform
4. Redeploy your application

---

**Remember:** Never share your API keys or commit them to Git!

