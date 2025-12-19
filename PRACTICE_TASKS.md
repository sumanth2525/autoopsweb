# Practice Tasks - Real-World Development

This file contains realistic tasks you can work on to practice professional software development.

## 🎯 Task Categories

### 🔴 High Priority (Start Here)

#### Task 1: User Authentication
**Difficulty:** Medium | **Time:** 2-3 days | **Skills:** Auth, Security

**Requirements:**
- Add NextAuth.js for authentication
- Implement sign up, login, logout
- Add protected routes
- Store user sessions
- Add password reset functionality

**Acceptance Criteria:**
- [ ] Users can register with email/password
- [ ] Users can login and logout
- [ ] Protected routes redirect to login
- [ ] User session persists across page reloads
- [ ] Password reset email works

**Deliverables:**
- Working authentication system
- Updated documentation
- Tests for auth flows

---

#### Task 2: Data Export Functionality
**Difficulty:** Easy | **Time:** 1-2 days | **Skills:** File Generation, UX

**Requirements:**
- Export crime data to CSV
- Export charts as PNG/PDF
- Add export button to dashboard
- Show download progress

**Acceptance Criteria:**
- [ ] CSV export includes all data columns
- [ ] Chart can be exported as image
- [ ] Export works on all browsers
- [ ] File downloads with proper name
- [ ] Large datasets export without errors

**Deliverables:**
- Export functionality working
- User documentation
- Error handling for large files

---

#### Task 3: Database Integration
**Difficulty:** Medium | **Time:** 3-4 days | **Skills:** Database, Backend

**Requirements:**
- Set up PostgreSQL or MongoDB
- Create database schema
- Cache API responses in database
- Store user search history
- Add data migration scripts

**Acceptance Criteria:**
- [ ] Database connection works
- [ ] API responses are cached
- [ ] Search history is saved
- [ ] Data can be queried efficiently
- [ ] Migrations run successfully

**Deliverables:**
- Database schema documentation
- Working database integration
- Migration scripts
- Connection test passes

---

### 🟡 Medium Priority

#### Task 4: Multi-Agency Comparison
**Difficulty:** Medium | **Time:** 2-3 days | **Skills:** Data Visualization, State Management

**Requirements:**
- Allow selecting multiple agencies
- Compare crime data side-by-side
- Show comparison charts
- Highlight differences

**Acceptance Criteria:**
- [ ] Can select 2-5 agencies
- [ ] Comparison chart displays correctly
- [ ] Data is clearly labeled
- [ ] Works on mobile devices
- [ ] Performance is good with multiple agencies

---

#### Task 5: Search History & Favorites
**Difficulty:** Easy | **Time:** 1-2 days | **Skills:** Local Storage, State Management

**Requirements:**
- Save recent searches
- Allow saving favorite searches
- Quick access to saved searches
- Clear history option

**Acceptance Criteria:**
- [ ] Recent searches are saved
- [ ] Favorites persist across sessions
- [ ] Can delete individual items
- [ ] UI is intuitive
- [ ] Works without database (localStorage)

---

#### Task 6: Dark Mode
**Difficulty:** Easy | **Time:** 1 day | **Skills:** Styling, State Management

**Requirements:**
- Add dark mode toggle
- Persist theme preference
- Smooth theme transitions
- All components support dark mode

**Acceptance Criteria:**
- [ ] Toggle switches theme
- [ ] Preference is saved
- [ ] All pages look good in dark mode
- [ ] No flash on page load
- [ ] Accessible color contrast

---

#### Task 7: Responsive Design Improvements
**Difficulty:** Medium | **Time:** 2 days | **Skills:** CSS, Responsive Design

**Requirements:**
- Improve mobile layout
- Fix chart responsiveness
- Optimize table for mobile
- Test on multiple devices

**Acceptance Criteria:**
- [ ] Works on phones (320px+)
- [ ] Charts are readable on mobile
- [ ] Tables are scrollable
- [ ] Touch interactions work
- [ ] No horizontal scrolling

---

### 🟢 Low Priority (Nice to Have)

#### Task 8: Email Notifications
**Difficulty:** Hard | **Time:** 3-4 days | **Skills:** Backend, Email Services

**Requirements:**
- Set up email service (SendGrid/Resend)
- Allow users to subscribe to updates
- Send weekly crime statistics
- Unsubscribe functionality

---

#### Task 9: Advanced Analytics
**Difficulty:** Hard | **Time:** 4-5 days | **Skills:** Data Analysis, Algorithms

**Requirements:**
- Add trend prediction
- Calculate crime rate per capita
- Show statistical significance
- Generate insights automatically

---

#### Task 10: API Rate Limiting
**Difficulty:** Medium | **Time:** 2 days | **Skills:** Backend, Security

**Requirements:**
- Implement rate limiting
- Show rate limit status to users
- Handle rate limit errors gracefully
- Add caching to reduce API calls

---

## 📝 How to Work on Tasks

### Step 1: Choose a Task
- Start with High Priority tasks
- Pick something that interests you
- Consider your skill level

### Step 2: Create an Issue
```markdown
## Task: [Task Name]

### Description
[What needs to be done]

### Requirements
- [ ] Requirement 1
- [ ] Requirement 2

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Estimated Time
[X] days
```

### Step 3: Create Feature Branch
```bash
git checkout -b feature/task-name
```

### Step 4: Implement
- Write code following best practices
- Test as you go
- Commit frequently with clear messages

### Step 5: Test
- Write unit tests
- Test manually
- Check edge cases
- Test on different devices

### Step 6: Document
- Update README if needed
- Add code comments
- Write user documentation
- Update CHANGELOG

### Step 7: Review & Deploy
- Self-review your code
- Create pull request
- Deploy to staging
- Test in staging
- Deploy to production

## 🎯 Task Templates

### Bug Fix Template
```markdown
**Bug Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [Browser name and version]
- OS: [Operating system]
- Device: [Desktop/Mobile]

**Screenshots:**
[If applicable]

**Solution:**
[How you fixed it]
```

### Feature Request Template
```markdown
**Feature Description:**
[What the feature does]

**User Story:**
As a [user type], I want [goal] so that [benefit].

**Requirements:**
- [ ] Requirement 1
- [ ] Requirement 2

**Design Mockups:**
[Link to designs or describe]

**Technical Approach:**
[How you'll implement it]

**Testing Plan:**
[How you'll test it]
```

## 📊 Progress Tracking

### Create a Task Board

Use GitHub Projects or a simple markdown file:

```markdown
## Task Board

### Backlog
- [ ] Task 1
- [ ] Task 2

### To Do
- [ ] Task 3

### In Progress
- [ ] Task 4 (Started: [Date])

### Review
- [ ] Task 5

### Done
- [x] Task 6 (Completed: [Date])
```

## 🏆 Challenge Levels

### Beginner (1-2 days per task)
- Dark mode
- Search history
- UI improvements
- Documentation updates

### Intermediate (2-4 days per task)
- Authentication
- Database integration
- Data export
- Multi-agency comparison

### Advanced (4+ days per task)
- Email notifications
- Advanced analytics
- Performance optimization
- API development

## 💡 Tips for Success

1. **Start Small** - Complete easy tasks first
2. **One at a Time** - Focus on one task
3. **Test Thoroughly** - Don't skip testing
4. **Document Well** - Future you will thank you
5. **Ask for Help** - Research solutions
6. **Celebrate Wins** - Complete tasks feel good!

## 🎓 Learning Opportunities

Each task teaches different skills:

- **Authentication** → Security, Sessions, JWT
- **Database** → SQL/NoSQL, Schema Design, Migrations
- **Export** → File Generation, Browser APIs
- **Dark Mode** → CSS, State Management, UX
- **Responsive** → CSS Grid, Flexbox, Media Queries
- **Analytics** → Data Processing, Algorithms, Statistics

---

**Start with Task 1 and work your way through! Good luck! 🚀**

