@echo off
echo ========================================
echo Crime Analytics Dashboard - Setup
echo ========================================
echo.

echo Step 1: Navigating to project directory...
cd /d "c:\Users\suman\Autoops Web"
if errorlevel 1 (
    echo ERROR: Could not navigate to project directory
    pause
    exit /b 1
)
echo ✓ Current directory: %CD%
echo.

echo Step 2: Installing dependencies...
echo This may take a few minutes, please wait...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed successfully
echo.

echo Step 3: Creating environment file...
if not exist .env.local (
    (
        echo FBI_API_KEY=DEMO_KEY
        echo NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
    ) > .env.local
    echo ✓ Environment file created
) else (
    echo ✓ Environment file already exists
)
echo.

echo Step 4: Starting development server...
echo.
echo ========================================
echo Choose a port:
echo 1. Port 3000 (default)
echo 2. Port 3001
echo 3. Port 3002
echo 4. Port 8080
echo 5. Custom port
echo ========================================
set /p portchoice="Enter choice (1-5): "

if "%portchoice%"=="1" (
    set PORTCMD=npm run dev
    set PORT=3000
) else if "%portchoice%"=="2" (
    set PORTCMD=npm run dev:3001
    set PORT=3001
) else if "%portchoice%"=="3" (
    set PORTCMD=npm run dev:3002
    set PORT=3002
) else if "%portchoice%"=="4" (
    set PORTCMD=npm run dev:8080
    set PORT=8080
) else if "%portchoice%"=="5" (
    set /p CUSTOMPORT="Enter custom port number: "
    set PORTCMD=next dev -p %CUSTOMPORT%
    set PORT=%CUSTOMPORT%
) else (
    set PORTCMD=npm run dev
    set PORT=3000
)

echo.
echo ========================================
echo Server is starting on port %PORT%...
echo Open http://localhost:%PORT% in your browser
echo Press Ctrl+C to stop the server
echo ========================================
echo.

call %PORTCMD%

pause

