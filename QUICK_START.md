# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
Create a file named `.env.local` in the root directory:
```env
FBI_API_KEY=DEMO_KEY
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
```

### Step 3: Run Development Server

**Default Port (3000):**
```bash
npm run dev
```

**Different Ports:**
```bash
# Port 3001
npm run dev:3001

# Port 3002
npm run dev:3002

# Port 8080
npm run dev:8080

# Custom port
next dev -p 4000
```

### Step 4: Open Browser
Navigate to: http://localhost:PORT
(Replace PORT with the port number you used)

## 📝 Common Agency Codes

Try these agency codes to test the application:

- `NJ1234567` - New Jersey (example)
- `CA0010100` - Los Angeles Police Department
- `NY0300000` - New York City Police Department
- `TX1010000` - Houston Police Department

**Note**: Agency codes follow the pattern: `[STATE][NUMBERS]`

## 🎯 Testing the Application

1. Enter an agency code (e.g., `NJ1234567`)
2. Select an offense type (e.g., `Violent Crime`)
3. Choose date range (e.g., 2010-2022)
4. Click "Search Crime Data"
5. View charts, statistics, and detailed data table

## 🔑 Getting Your Own API Key

1. Visit: https://api.data.gov/signup/
2. Sign up for a free account
3. Get your API key
4. Replace `DEMO_KEY` in `.env.local` with your key

## 💡 Learning Path

### For Beginners:
1. Start by understanding the component structure
2. Read `lib/api/crimeApi.ts` to understand API integration
3. Explore `components/` to see reusable components
4. Modify styles in `tailwind.config.js`

### For Intermediate:
1. Add new chart types (bar charts, pie charts)
2. Implement data export functionality
3. Add filtering and sorting to the data table
4. Create comparison views for multiple agencies

### For Advanced:
1. Add authentication and user accounts
2. Implement data caching with Redis
3. Add real-time updates
4. Build a mobile app version
5. Add machine learning predictions

## 🐛 Common Issues

**Port 3000 already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Module not found errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**API errors?**
- Check your API key in `.env.local`
- Verify the agency code format
- Check your internet connection

## 📚 Next Steps

1. Read the full [README.md](./README.md)
2. Explore the code structure
3. Try modifying components
4. Add your own features
5. Deploy to production!

---

Happy coding! 🎉

