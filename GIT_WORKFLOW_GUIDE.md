# Git Workflow Guide - Professional Practices

Learn how to use Git like a professional developer working on a real team.

## 🌿 Branch Strategy

### Main Branches

```
main (production-ready code)
  └── develop (integration branch)
       └── feature/feature-name
       └── bugfix/bug-name
       └── hotfix/urgent-fix
```

### Branch Naming Convention

```bash
feature/user-authentication    # New features
bugfix/chart-mobile-display     # Bug fixes
hotfix/api-timeout-error        # Urgent production fixes
refactor/api-service-layer      # Code refactoring
docs/update-readme              # Documentation updates
test/add-unit-tests             # Adding tests
```

## 📝 Commit Message Format

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commit messages
feat(auth): add user login functionality
fix(chart): resolve mobile display issue
docs(readme): update installation instructions
refactor(api): improve error handling
test(utils): add tests for connection test utility

# Bad commit messages (avoid these)
fix bug
update
changes
wip
```

## 🔄 Daily Workflow

### Morning Routine

```bash
# 1. Check current branch
git branch

# 2. Switch to develop/main
git checkout develop

# 3. Pull latest changes
git pull origin develop

# 4. Create feature branch
git checkout -b feature/my-feature-name
```

### During Development

```bash
# Make changes, then commit frequently
git add .
git commit -m "feat(component): add dark mode toggle"

# Continue working...
git add .
git commit -m "style(component): improve toggle button styling"

# Push to remote
git push origin feature/my-feature-name
```

### End of Day

```bash
# Commit any remaining work
git add .
git commit -m "feat(component): complete dark mode implementation"

# Push to remote
git push origin feature/my-feature-name
```

## 🔀 Merging Work

### Create Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/my-feature-name
   ```

2. **Create PR on GitHub:**
   - Go to repository
   - Click "New Pull Request"
   - Select your branch
   - Write description
   - Request review (self-review if solo)

3. **Review Checklist:**
   - [ ] Code follows style guide
   - [ ] Tests are included
   - [ ] Documentation updated
   - [ ] No console.logs
   - [ ] Error handling is proper

4. **Merge:**
   ```bash
   # After PR is approved, merge on GitHub
   # Then update local branches
   git checkout develop
   git pull origin develop
   git branch -d feature/my-feature-name  # Delete local branch
   ```

## 🚨 Handling Conflicts

### When Conflicts Occur

```bash
# 1. Pull latest changes
git checkout develop
git pull origin develop

# 2. Merge develop into your branch
git checkout feature/my-feature-name
git merge develop

# 3. Resolve conflicts
# Edit conflicted files
# Remove conflict markers (<<<<<<, ======, >>>>>>)

# 4. Stage resolved files
git add .

# 5. Complete merge
git commit -m "merge: resolve conflicts with develop"
```

## 🏷️ Tagging Releases

### Create a Release

```bash
# 1. Update version in package.json
# 2. Commit version bump
git commit -m "chore: bump version to 1.1.0"

# 3. Create tag
git tag -a v1.1.0 -m "Release version 1.1.0"

# 4. Push tag
git push origin v1.1.0
```

## 📋 Git Commands Cheat Sheet

### Daily Commands

```bash
# Check status
git status

# View changes
git diff

# Stage files
git add .                    # All files
git add file.js              # Specific file
git add src/                 # Directory

# Commit
git commit -m "message"      # Simple commit
git commit -am "message"     # Stage and commit tracked files

# Push
git push                     # Push to current branch
git push origin branch-name  # Push specific branch

# Pull
git pull                     # Pull latest changes
git pull --rebase            # Pull with rebase

# Branch
git branch                   # List branches
git branch new-branch        # Create branch
git checkout branch-name     # Switch branch
git checkout -b new-branch   # Create and switch

# Merge
git merge branch-name        # Merge branch into current
```

### Useful Commands

```bash
# View history
git log                      # Full log
git log --oneline            # Compact log
git log --graph              # Visual log

# Undo changes
git reset HEAD~1             # Undo last commit (keep changes)
git reset --hard HEAD~1      # Undo last commit (discard changes)
git checkout -- file.js      # Discard file changes

# Stash (save work temporarily)
git stash                    # Save current work
git stash pop                # Restore stashed work
git stash list               # List stashes

# Remote
git remote -v                # View remotes
git remote add origin url    # Add remote
git fetch origin             # Fetch from remote
```

## 🎯 Best Practices

### DO ✅

- Commit frequently (small, logical commits)
- Write clear commit messages
- Pull before starting work
- Create feature branches
- Test before committing
- Review your own code

### DON'T ❌

- Commit broken code
- Commit with vague messages
- Commit directly to main
- Commit large files
- Commit secrets/API keys
- Force push to main

## 📊 Example Workflow

### Complete Feature Development

```bash
# Day 1: Start feature
git checkout develop
git pull origin develop
git checkout -b feature/dark-mode
# ... make changes ...
git add .
git commit -m "feat(theme): add dark mode toggle component"
git push origin feature/dark-mode

# Day 2: Continue work
git checkout feature/dark-mode
git pull origin feature/dark-mode
# ... make changes ...
git add .
git commit -m "style(theme): improve dark mode colors"
git push origin feature/dark-mode

# Day 3: Complete feature
git checkout feature/dark-mode
# ... final changes ...
git add .
git commit -m "feat(theme): complete dark mode implementation"
git push origin feature/dark-mode

# Create PR on GitHub, review, merge
# Then cleanup
git checkout develop
git pull origin develop
git branch -d feature/dark-mode
```

## 🔍 Code Review Checklist

### Before Creating PR

- [ ] Code follows project style
- [ ] All tests pass
- [ ] No console.logs
- [ ] Error handling is proper
- [ ] Documentation updated
- [ ] No commented-out code
- [ ] No hardcoded values
- [ ] Performance considered

## 🎓 Practice Exercises

### Exercise 1: Basic Workflow
1. Create a new branch
2. Make a small change
3. Commit with proper message
4. Push to remote
5. Create PR
6. Merge PR
7. Delete branch

### Exercise 2: Conflict Resolution
1. Create two branches from same base
2. Modify same file in both
3. Merge one into other
4. Resolve conflicts
5. Complete merge

### Exercise 3: Release Process
1. Complete a feature
2. Update version
3. Create release tag
4. Push tag
5. Create GitHub release

---

**Practice these workflows daily to build professional Git skills! 🚀**

