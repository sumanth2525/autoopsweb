/**
 * Database Connection Interface
 * Unified interface for different database types
 */

export interface DatabaseConfig {
  type: 'postgresql' | 'mongodb' | 'sqlite' | 'mysql';
  url?: string;
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
}

export interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  testConnection(): Promise<boolean>;
  getStatus(): 'connected' | 'disconnected' | 'error';
}

/**
 * Get database configuration from environment variables
 */
export function getDatabaseConfig(): DatabaseConfig | null {
  const dbUrl = process.env.DATABASE_URL;
  const dbType = process.env.DATABASE_TYPE?.toLowerCase();

  if (!dbUrl && !dbType) {
    return null; // No database configured
  }

  // If DATABASE_URL is provided, try to detect type from URL
  if (dbUrl) {
    if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
      return { type: 'postgresql', url: dbUrl };
    }
    if (dbUrl.startsWith('mongodb://') || dbUrl.startsWith('mongodb+srv://')) {
      return { type: 'mongodb', url: dbUrl };
    }
    if (dbUrl.startsWith('mysql://')) {
      return { type: 'mysql', url: dbUrl };
    }
    if (dbUrl.endsWith('.db') || dbUrl.startsWith('sqlite://')) {
      return { type: 'sqlite', url: dbUrl };
    }
  }

  // Use explicit type if provided
  if (dbType) {
    return {
      type: dbType as DatabaseConfig['type'],
      url: dbUrl,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    };
  }

  return null;
}

/**
 * Database connection status
 */
export class DatabaseStatus {
  private static instance: DatabaseStatus;
  private status: 'connected' | 'disconnected' | 'error' = 'disconnected';
  private lastCheck: Date | null = null;

  private constructor() {}

  static getInstance(): DatabaseStatus {
    if (!DatabaseStatus.instance) {
      DatabaseStatus.instance = new DatabaseStatus();
    }
    return DatabaseStatus.instance;
  }

  setStatus(status: 'connected' | 'disconnected' | 'error') {
    this.status = status;
    this.lastCheck = new Date();
  }

  getStatus(): 'connected' | 'disconnected' | 'error' {
    return this.status;
  }

  getLastCheck(): Date | null {
    return this.lastCheck;
  }
}

