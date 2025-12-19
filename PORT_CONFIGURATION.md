# Port Configuration Guide

This guide explains how to run the Crime Analytics Dashboard on different ports.

## 🚀 Quick Start - Different Ports

### Pre-configured Ports

The project includes scripts for common ports:

```bash
# Port 3001
npm run dev:3001

# Port 3002
npm run dev:3002

# Port 8080
npm run dev:8080
```

### Custom Port

To use any custom port:

```bash
# Windows PowerShell
$env:PORT=4000; npm run dev

# Or directly
next dev -p 4000

# Or with npm
npm run dev -- -p 4000
```

## 📋 Available Port Scripts

| Command | Port | Use Case |
|---------|------|----------|
| `npm run dev` | 3000 | Default development |
| `npm run dev:3001` | 3001 | Alternative port |
| `npm run dev:3002` | 3002 | Alternative port |
| `npm run dev:8080` | 8080 | Common web port |
| `next dev -p PORT` | Custom | Any port you specify |

## 🔧 Production Ports

For production builds:

```bash
# Build first
npm run build

# Then start on specific port
npm run start:3001
# or
next start -p 8080
```

## 🌐 Accessing the Application

After starting on a different port, access the application at:

- **Default:** http://localhost:3000
- **Port 3001:** http://localhost:3001
- **Port 3002:** http://localhost:3002
- **Port 8080:** http://localhost:8080
- **Custom Port:** http://localhost:YOUR_PORT

## 🔍 Finding Available Ports

### Check if a port is in use (Windows):

```powershell
# Check specific port
netstat -ano | findstr :3001

# Check all listening ports
netstat -ano | findstr LISTENING
```

### Find an available port:

```powershell
# PowerShell function to find available port
function Get-AvailablePort {
    $port = 3000
    while ($true) {
        $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if (-not $connection) {
            return $port
        }
        $port++
    }
}
Get-AvailablePort
```

## ⚙️ Environment Variable Method

You can also set the port via environment variable:

### Windows PowerShell:
```powershell
$env:PORT=4000
npm run dev
```

### Windows CMD:
```cmd
set PORT=4000
npm run dev
```

### Create .env.local:
```env
PORT=4000
```

Note: Next.js uses the `-p` flag, so environment variable method requires custom script modification.

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**
1. Use a different port: `npm run dev:3001`
2. Find and kill the process using the port:
   ```powershell
   # Find process
   netstat -ano | findstr :3000
   
   # Kill process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```
3. Use a completely different port range (4000-9000)

### Port Permission Issues

**Error:** `EACCES: permission denied`

**Solutions:**
1. Use a port above 1024 (ports below 1024 require admin)
2. Run as administrator (not recommended for development)
3. Use ports 3000-9000 range

### Multiple Instances

To run multiple instances simultaneously:

```bash
# Terminal 1
npm run dev:3001

# Terminal 2
npm run dev:3002

# Terminal 3
npm run dev:3003
```

## 📝 Updating Connection Test URLs

If you change the port, the connection test page will automatically work because it uses relative URLs. However, if you need to test from external tools:

- Health Check: `http://localhost:YOUR_PORT/api/health`
- Connection Test: `http://localhost:YOUR_PORT/api/test-connections`
- Test Page: `http://localhost:YOUR_PORT/test-connections`

## 🔐 Firewall Considerations

If running on a non-standard port, ensure:

1. **Windows Firewall** allows the port
2. **Antivirus** doesn't block the port
3. **Corporate networks** allow the port range

### Allow Port in Windows Firewall:

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Next.js Dev Server" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
```

## 📊 Recommended Ports

| Environment | Recommended Port | Reason |
|-------------|-----------------|--------|
| Development | 3000, 3001, 3002 | Standard Next.js ports |
| Testing | 3003-3010 | Test environment range |
| Staging | 8080, 8081 | Common staging ports |
| Production | 80, 443 | Standard HTTP/HTTPS |

## 🎯 Quick Reference

```bash
# Most common: Use port 3001
npm run dev:3001

# Then open: http://localhost:3001
```

---

**Tip:** Bookmark this page for quick port reference!

