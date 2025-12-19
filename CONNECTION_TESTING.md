# Connection Testing Guide

This document explains how to test all connections in the Crime Analytics Dashboard application.

## 🧪 What Gets Tested

The application tests the following connections:

1. **Web Server** - Tests if the Next.js server is running and responsive
2. **Internet Connection** - Verifies general internet connectivity
3. **FBI Crime Statistics API** - Tests connection to the external API endpoint
4. **Database** - Database connection testing (structure ready for future implementation)

## 🚀 How to Access Connection Tests

### Method 1: Via Web Interface
1. Start the development server: `npm run dev`
2. Open your browser to: `http://localhost:3000`
3. Click the **"Test Connections"** button in the header
4. Or navigate directly to: `http://localhost:3000/test-connections`

### Method 2: Via API Endpoints

#### Health Check Endpoint
```bash
GET http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "server": "running",
    "api": "available"
  }
}
```

#### Connection Test Endpoint
```bash
GET http://localhost:3000/api/test-connections
```

**Response:**
```json
{
  "overall": "healthy",
  "services": [
    {
      "name": "Web Server",
      "status": "success",
      "message": "Server is running and responsive",
      "responseTime": 15,
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "name": "Internet Connection",
      "status": "success",
      "message": "Internet connectivity available",
      "responseTime": 120,
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "name": "FBI Crime Statistics API",
      "status": "success",
      "message": "API connection successful",
      "responseTime": 450,
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "name": "Database",
      "status": "warning",
      "message": "Database not configured (optional)",
      "responseTime": 0,
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📊 Status Types

### Status Values
- **success** ✅ - Connection is working properly
- **error** ❌ - Connection failed or unreachable
- **warning** ⚠️ - Connection has issues but may still work
- **pending** ⏳ - Test is in progress

### Overall Status
- **healthy** - All critical services are working
- **degraded** - Some services have warnings but core functionality works
- **down** - Critical services are failing

## 🔧 Testing Individual Connections

### Test Web Server
```typescript
import { testWebServer } from '@/lib/utils/connectionTest';

const result = await testWebServer();
console.log(result);
```

### Test FBI API
```typescript
import { testFBIAPI } from '@/lib/utils/connectionTest';

const result = await testFBIAPI();
console.log(result);
```

### Test Internet Connection
```typescript
import { testInternetConnection } from '@/lib/utils/connectionTest';

const result = await testInternetConnection();
console.log(result);
```

### Test All Connections
```typescript
import { runAllTests } from '@/lib/utils/connectionTest';

const results = await runAllTests();
console.log(results);
```

## 🐛 Troubleshooting

### Web Server Test Fails
- **Check:** Is the development server running?
- **Solution:** Run `npm run dev` and wait for "Ready" message

### FBI API Test Fails
- **Check:** Is your API key valid?
- **Check:** Is your internet connection working?
- **Solution:** 
  1. Verify API key in `.env.local`
  2. Check internet connectivity
  3. Verify API endpoint is accessible

### Internet Connection Test Fails
- **Check:** Do you have an active internet connection?
- **Solution:** Check your network settings and firewall

### Database Test Shows Warning
- **Note:** This is expected if no database is configured
- **Solution:** Database connection testing is optional and ready for future implementation

## 📝 Adding Custom Connection Tests

To add a new connection test:

1. **Create test function** in `lib/utils/connectionTest.ts`:
```typescript
export async function testYourService(): Promise<ConnectionStatus> {
  const startTime = Date.now();
  try {
    // Your test logic here
    const response = await fetch('your-endpoint');
    const responseTime = Date.now() - startTime;
    
    return {
      name: 'Your Service',
      status: response.ok ? 'success' : 'error',
      message: response.ok ? 'Connection successful' : 'Connection failed',
      responseTime,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    return {
      name: 'Your Service',
      status: 'error',
      message: error.message,
      responseTime: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };
  }
}
```

2. **Add to runAllTests function**:
```typescript
const tests = [
  testWebServer(),
  testInternetConnection(),
  testFBIAPI(),
  testDatabase(),
  testYourService(), // Add here
];
```

3. **The test will automatically appear** in the connection status dashboard!

## 🔄 Auto-Refresh

The connection test page automatically runs tests when:
- Page is first loaded
- User clicks "Run Tests" button

You can add auto-refresh by modifying `app/test-connections/page.tsx`:
```typescript
useEffect(() => {
  runTests();
  const interval = setInterval(runTests, 60000); // Every 60 seconds
  return () => clearInterval(interval);
}, []);
```

## 📈 Response Time Benchmarks

Expected response times:
- **Web Server:** < 50ms (local)
- **Internet Connection:** < 500ms
- **FBI API:** < 2000ms (depends on network)
- **Database:** Varies by database type

## 🎯 Best Practices

1. **Run tests regularly** to monitor system health
2. **Check response times** - slow responses may indicate issues
3. **Review error details** - click "View Details" for more information
4. **Monitor trends** - track response times over time
5. **Set up alerts** - configure notifications for critical failures

## 🔐 Security Notes

- Connection tests are safe to run in production
- No sensitive data is exposed in test results
- API keys are not included in response details
- Tests use read-only operations

---

**Need Help?** Check the main [README.md](./README.md) for general setup instructions.

