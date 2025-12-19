# Setup Commands - Step by Step Guide

Follow these commands in order to set up and run the Crime Analytics Dashboard application.

## Step 1: Navigate to Project Directory
```bash
cd "c:\Users\suman\Autoops Web"
```

## Step 2: Install Dependencies
```bash
npm install
```
**Wait for this to complete** - This will install all required packages (Next.js, React, TypeScript, etc.)

## Step 3: Create Environment File (Optional but Recommended)
Create a file named `.env.local` in the project root with:
```
FBI_API_KEY=DEMO_KEY
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
```

**Or use this command:**
```powershell
echo "FBI_API_KEY=DEMO_KEY`nNEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api" | Out-File -FilePath .env.local -Encoding utf8
```

## Step 4: Start Development Server

### Option A: Default Port (3000)
```bash
npm run dev
```

### Option B: Different Ports
```bash
# Port 3001
npm run dev:3001

# Port 3002
npm run dev:3002

# Port 8080
npm run dev:8080

# Custom Port (replace PORT_NUMBER)
next dev -p PORT_NUMBER
```

**Wait for the output** - You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:PORT
  - Ready in X seconds
```

## Step 5: Open Browser
Once you see "Ready" in the terminal, open your browser and go to:
```
http://localhost:PORT
```
(Replace PORT with the port number you chose)

---

## Alternative: All Commands in One Go (PowerShell)

If you want to run everything at once, copy and paste this into PowerShell:

```powershell
# Navigate to project
cd "c:\Users\suman\Autoops Web"

# Install dependencies
npm install

# Create environment file
echo "FBI_API_KEY=DEMO_KEY`nNEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api" | Out-File -FilePath .env.local -Encoding utf8

# Start server
npm run dev
```

---

## Troubleshooting Commands

### If port 3000 is already in use:
```bash
# Use predefined port 3001
npm run dev:3001

# Or use any custom port
next dev -p 3001
```
Then open: http://localhost:3001

### If you get module errors:
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
npm install
npm run dev
```

### To stop the server:
Press `Ctrl + C` in the terminal where the server is running

### To check if server is running:
```bash
netstat -ano | findstr :3000
```

---

## Quick Reference

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `cd "c:\Users\suman\Autoops Web"` | Navigate to project |
| 2 | `npm install` | Install dependencies |
| 3 | Create `.env.local` file | Set environment variables |
| 4 | `npm run dev` | Start development server |
| 5 | Open `http://localhost:3000` | View application |

---

## Expected Output

After running `npm run dev`, you should see:
```
> crime-analytics-dashboard@1.0.0 dev
> next dev

   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
 ○ Compiling / ...
 ✓ Compiled / in 3.2s
```

Once you see "Ready", the application is running!

---

## Next Steps After Setup

1. ✅ Server is running
2. ✅ Open browser to http://localhost:3000
3. ✅ You'll see the Crime Analytics Dashboard
4. ✅ Try searching with agency code: `NJ1234567`
5. ✅ Select offense type: `Violent Crime`
6. ✅ Click "Search Crime Data"
7. ✅ View charts and statistics!

---

**Note:** The first time you run `npm install`, it may take 2-5 minutes depending on your internet speed. Be patient!

