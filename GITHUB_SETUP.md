# GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `crime-analytics-dashboard` (or any name you like)
4. Description: "Crime Analytics Dashboard using FBI Crime Statistics API"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Get Repository URL

After creating, GitHub will show you the repository URL. It will look like:
```
https://github.com/sumanth2525/crime-analytics-dashboard.git
```

## Step 3: Add Remote and Push

### Option A: Using Personal Access Token (Recommended)

**Important:** GitHub no longer accepts passwords. You need a Personal Access Token.

#### Create Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name: "Crime Analytics Dashboard"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

#### Push Code:

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/sumanth2525/crime-analytics-dashboard.git

# Push code
git branch -M main
git push -u origin main
```

When prompted for password, **paste your Personal Access Token** (not your GitHub password).

### Option B: Using GitHub CLI (Easier)

```bash
# Install GitHub CLI if not installed
# Download from: https://cli.github.com

# Login
gh auth login

# Create repository and push
gh repo create crime-analytics-dashboard --public --source=. --remote=origin --push
```

### Option C: Using SSH (Most Secure)

#### Set up SSH Key:

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

1. Copy the public key output
2. Go to GitHub → Settings → SSH and GPG keys
3. Click **"New SSH key"**
4. Paste your public key
5. Click **"Add SSH key"**

#### Push with SSH:

```bash
# Add remote with SSH URL
git remote add origin git@github.com:sumanth2525/crime-analytics-dashboard.git

# Push
git branch -M main
git push -u origin main
```

## Quick Commands Summary

```bash
# 1. Initialize (already done)
git init

# 2. Add files (already done)
git add .

# 3. Commit (already done)
git commit -m "feat: initial commit"

# 4. Add remote (replace URL with yours)
git remote add origin https://github.com/sumanth2525/YOUR-REPO-NAME.git

# 5. Rename branch to main
git branch -M main

# 6. Push to GitHub
git push -u origin main
```

## Troubleshooting

### "Authentication failed"
- Use Personal Access Token instead of password
- Make sure token has "repo" scope

### "Repository not found"
- Check repository name is correct
- Make sure repository exists on GitHub
- Verify you have access

### "Permission denied"
- Check your username is correct
- Verify SSH key is added to GitHub (if using SSH)
- Make sure token has correct permissions

## After Pushing

1. ✅ Visit your repository on GitHub
2. ✅ Verify all files are there
3. ✅ Check README displays correctly
4. ✅ Ready to deploy!

---

**Need help?** The easiest method is Option A (Personal Access Token).

