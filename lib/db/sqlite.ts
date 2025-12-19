/**
 * SQLite Database Connection
 * Requires: npm install better-sqlite3
 * OR: npm install sqlite3
 */

import { DatabaseConnection, DatabaseConfig } from './database';

export class SQLiteConnection implements DatabaseConnection {
  private config: DatabaseConfig;
  private db: any = null;
  private status: 'connected' | 'disconnected' | 'error' = 'disconnected';

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      const dbPath = this.config.url || './crime_analytics.db';
      
      // Try better-sqlite3 first (synchronous, faster)
      try {
        const Database = (await import('better-sqlite3')).default;
        this.db = new Database(dbPath);
        this.status = 'connected';
        console.log('✅ SQLite connected successfully');
        return;
      } catch (e) {
        // Fallback to sqlite3 (asynchronous)
        const sqlite3 = await import('sqlite3');
        const { promisify } = await import('util');
        
        return new Promise((resolve, reject) => {
          this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if (err) {
              this.status = 'error';
              reject(new Error(`SQLite connection failed: ${err.message}`));
            } else {
              this.status = 'connected';
              console.log('✅ SQLite connected successfully');
              resolve();
            }
          });
        });
      }
    } catch (error: any) {
      this.status = 'error';
      console.error('❌ SQLite connection error:', error.message);
      throw new Error(`SQLite connection failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      if (this.db.close) {
        // better-sqlite3
        this.db.close();
      } else {
        // sqlite3
        return new Promise((resolve) => {
          this.db.close((err: Error | null) => {
            if (err) console.error('SQLite close error:', err);
            resolve();
          });
        });
      }
      this.status = 'disconnected';
      console.log('SQLite disconnected');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.db) {
        await this.connect();
      }
      
      if (this.db.prepare) {
        // better-sqlite3
        const stmt = this.db.prepare('SELECT 1');
        stmt.get();
        return true;
      } else {
        // sqlite3
        return new Promise((resolve) => {
          this.db.get('SELECT 1', (err: Error | null) => {
            resolve(!err);
          });
        });
      }
    } catch (error) {
      this.status = 'error';
      return false;
    }
  }

  getStatus(): 'connected' | 'disconnected' | 'error' {
    return this.status;
  }

  getDatabase() {
    return this.db;
  }
}

