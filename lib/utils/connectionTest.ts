/**
 * Connection Testing Utilities
 * Tests all connections: Web Server, Database, and External APIs
 */

export interface ConnectionStatus {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  responseTime?: number;
  details?: any;
  timestamp: string;
}

export interface TestResult {
  overall: 'healthy' | 'degraded' | 'down';
  services: ConnectionStatus[];
  timestamp: string;
}

/**
 * Test FBI Crime Statistics API Connection
 */
export async function testFBIAPI(): Promise<ConnectionStatus> {
  const startTime = Date.now();
  const apiKey = process.env.NEXT_PUBLIC_FBI_API_KEY || 'DEMO_KEY';
  const baseUrl = process.env.NEXT_PUBLIC_FBI_API_BASE_URL || 'https://api.usa.gov/crime/fbi/sapi/api';
  
  try {
    // Test with a simple endpoint
    const testUrl = `${baseUrl}/estimates/agencies/agency/NJ1234567/offenses/violent-crime/2020/2020`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${testUrl}?api_key=${apiKey}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        name: 'FBI Crime Statistics API',
        status: 'success',
        message: 'API connection successful',
        responseTime,
        details: {
          statusCode: response.status,
          hasData: !!data.data,
        },
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        name: 'FBI Crime Statistics API',
        status: 'error',
        message: `API returned status ${response.status}`,
        responseTime,
        details: {
          statusCode: response.status,
          statusText: response.statusText,
        },
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      name: 'FBI Crime Statistics API',
      status: 'error',
      message: error.name === 'AbortError' 
        ? 'Request timeout (10s)' 
        : error.message || 'Connection failed',
      responseTime,
      details: {
        error: error.name,
        message: error.message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Test Web Server Health
 */
export async function testWebServer(): Promise<ConnectionStatus> {
  const startTime = Date.now();
  
  try {
    // Test if we can make a request to the server
    const response = await fetch('/api/health', {
      method: 'GET',
      cache: 'no-store',
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        name: 'Web Server',
        status: 'success',
        message: 'Server is running and responsive',
        responseTime,
        details: data,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        name: 'Web Server',
        status: 'warning',
        message: `Server responded with status ${response.status}`,
        responseTime,
        details: {
          statusCode: response.status,
        },
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      name: 'Web Server',
      status: 'error',
      message: error.message || 'Cannot reach server',
      responseTime,
      details: {
        error: error.name,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Test Database Connection
 */
export async function testDatabase(): Promise<ConnectionStatus> {
  const startTime = Date.now();
  
  try {
    // Dynamic import to avoid errors if database packages aren't installed
    const { getDatabaseConfig } = await import('@/lib/db/database');
    const config = getDatabaseConfig();
    
    if (!config) {
      const responseTime = Date.now() - startTime;
      return {
        name: 'Database',
        status: 'warning',
        message: 'Database not configured (optional)',
        responseTime,
        details: {
          note: 'Database is optional. See DATABASE_GUIDE.md for setup instructions',
          supported: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'],
          setupGuide: 'Check DATABASE_GUIDE.md for installation steps',
        },
        timestamp: new Date().toISOString(),
      };
    }

    // Test connection based on database type
    let connected = false;
    let dbType = config.type;
    
    try {
      if (config.type === 'postgresql') {
        const { PostgreSQLConnection } = await import('@/lib/db/postgres');
        const db = new PostgreSQLConnection(config);
        connected = await db.testConnection();
        await db.disconnect();
      } else if (config.type === 'mongodb') {
        try {
          const { MongoDBConnection } = await import('@/lib/db/mongodb');
          const db = new MongoDBConnection(config);
          connected = await db.testConnection();
          await db.disconnect();
        } catch (mongodbError: any) {
          if (mongodbError.message?.includes('not installed')) {
            throw mongodbError;
          }
          throw mongodbError;
        }
      } else if (config.type === 'sqlite') {
        try {
          const { SQLiteConnection } = await import('@/lib/db/sqlite');
          const db = new SQLiteConnection(config);
          connected = await db.testConnection();
          await db.disconnect();
        } catch (sqliteError: any) {
          if (sqliteError.message?.includes('not installed')) {
            throw sqliteError;
          }
          throw sqliteError;
        }
      }
    } catch (dbError: any) {
      const responseTime = Date.now() - startTime;
      return {
        name: 'Database',
        status: 'error',
        message: `Database connection failed: ${dbError.message}`,
        responseTime,
        details: {
          type: dbType,
          error: dbError.message,
          hint: 'Make sure database packages are installed (see DATABASE_GUIDE.md)',
        },
        timestamp: new Date().toISOString(),
      };
    }

    const responseTime = Date.now() - startTime;
    
    if (connected) {
      return {
        name: 'Database',
        status: 'success',
        message: `${dbType.toUpperCase()} connection successful`,
        responseTime,
        details: {
          type: dbType,
          status: 'connected',
        },
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        name: 'Database',
        status: 'error',
        message: 'Database connection test failed',
        responseTime,
        details: {
          type: dbType,
        },
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      name: 'Database',
      status: 'warning',
      message: 'Database packages not installed',
      responseTime,
      details: {
        error: error.message,
        note: 'Install database packages to enable database testing',
        guide: 'See DATABASE_GUIDE.md for installation instructions',
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Test Internet Connectivity
 */
export async function testInternetConnection(): Promise<ConnectionStatus> {
  const startTime = Date.now();
  
  try {
    // Test with a reliable service
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      name: 'Internet Connection',
      status: 'success',
      message: 'Internet connectivity available',
      responseTime,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    return {
      name: 'Internet Connection',
      status: 'error',
      message: 'No internet connection detected',
      responseTime,
      details: {
        error: error.name,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Run all connection tests
 */
export async function runAllTests(): Promise<TestResult> {
  const tests = [
    testWebServer(),
    testInternetConnection(),
    testFBIAPI(),
    testDatabase(),
  ];

  const results = await Promise.all(tests);
  
  // Determine overall status
  const hasError = results.some(r => r.status === 'error');
  const hasWarning = results.some(r => r.status === 'warning');
  
  let overall: 'healthy' | 'degraded' | 'down' = 'healthy';
  if (hasError) {
    overall = 'down';
  } else if (hasWarning) {
    overall = 'degraded';
  }

  return {
    overall,
    services: results,
    timestamp: new Date().toISOString(),
  };
}

