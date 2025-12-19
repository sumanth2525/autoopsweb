/**
 * MongoDB Database Connection
 * Requires: npm install mongodb mongoose
 */

import { DatabaseConnection, DatabaseConfig } from './database';

export class MongoDBConnection implements DatabaseConnection {
  private config: DatabaseConfig;
  private client: any = null;
  private status: 'connected' | 'disconnected' | 'error' = 'disconnected';

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      // Dynamic import to avoid errors if mongodb is not installed
      const { MongoClient } = await import('mongodb');
      
      const uri = this.config.url || 
        `mongodb://${this.config.host || 'localhost'}:${this.config.port || 27017}/${this.config.database || 'crime_analytics'}`;
      
      this.client = new MongoClient(uri);
      await this.client.connect();
      this.status = 'connected';
      console.log('✅ MongoDB connected successfully');
    } catch (error: any) {
      this.status = 'error';
      console.error('❌ MongoDB connection error:', error.message);
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.status = 'disconnected';
      console.log('MongoDB disconnected');
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.client) {
        await this.connect();
      }
      await this.client.db().admin().ping();
      return true;
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

  getDatabase(name?: string) {
    if (!this.client) {
      throw new Error('MongoDB client not connected');
    }
    return this.client.db(name || this.config.database || 'crime_analytics');
  }
}

