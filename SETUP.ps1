# Crime Analytics Dashboard - Setup Script
# Run this script: .\SETUP.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Crime Analytics Dashboard - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Navigate to project directory
Write-Host "Step 1: Navigating to project directory..." -ForegroundColor Yellow
$projectPath = "c:\Users\suman\Autoops Web"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✓ Current directory: $(Get-Location)" -ForegroundColor Green
} else {
    Write-Host "ERROR: Project directory not found: $projectPath" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Install dependencies
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes, please wait..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Create environment file
Write-Host "Step 3: Creating environment file..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    @"
FBI_API_KEY=DEMO_KEY
NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✓ Environment file created" -ForegroundColor Green
} else {
    Write-Host "✓ Environment file already exists" -ForegroundColor Green
}
Write-Host ""

# Step 4: Start development server
Write-Host "Step 4: Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Server is starting..." -ForegroundColor Green
Write-Host "Open http://localhost:3000 in your browser" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

npm run dev

