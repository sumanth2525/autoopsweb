/**
 * PostgreSQL Database Connection
 * Requires: npm install pg @types/pg
 */

import { DatabaseConnection, DatabaseConfig } from './database';

export class PostgreSQLConnection implements DatabaseConnection {
  private config: DatabaseConfig;
  private client: any = null;
  private status: 'connected' | 'disconnected' | 'error' = 'disconnected';

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      // Dynamic import to avoid errors if pg is not installed
      const { Client } = await import('pg');
      
      if (this.config.url) {
        this.client = new Client({ connectionString: this.config.url });
      } else {
        this.client = new Client({
          host: this.config.host || 'localhost',
          port: this.config.port || 5432,
          database: this.config.database || 'crime_analytics',
          user: this.config.username,
          password: this.config.password,
        });
      }

      await this.client.connect();
      this.status = 'connected';
      console.log('✅ PostgreSQL connected successfully');
    } catch (error: any) {
      this.status = 'error';
      console.error('❌ PostgreSQL connection error:', error.message);
      throw new Error(`PostgreSQL connection failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      this.status = 'disconnected';
      console.log('PostgreSQL disconnected');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.client) {
        await this.connect();
      }
      const result = await this.client.query('SELECT NOW()');
      return result.rows.length > 0;
    } catch (error) {
      this.status = 'error';
      return false;
    }
  }

  getStatus(): 'connected' | 'disconnected' | 'error' {
    return this.status;
  }

  getClient() {
    return this.client;
  }
}

