/**
 * Type declarations for optional database packages
 * These packages are optional and may not be installed
 */

declare module 'mongodb' {
  export class MongoClient {
    constructor(uri: string, options?: any);
    connect(): Promise<void>;
    close(): Promise<void>;
    db(name?: string): any;
  }
  export default MongoClient;
}

declare module 'sqlite3' {
  export class Database {
    constructor(path: string, callback?: (err: Error | null) => void);
    get(sql: string, callback: (err: Error | null, row: any) => void): void;
    close(callback?: (err: Error | null) => void): void;
  }
}

declare module 'better-sqlite3' {
  class Database {
    constructor(path: string);
    prepare(sql: string): Statement;
    close(): void;
  }
  interface Statement {
    get(...params: any[]): any;
    run(...params: any[]): any;
    all(...params: any[]): any[];
  }
  export default Database;
}

declare module 'pg' {
  export class Client {
    constructor(config: any);
    connect(): Promise<void>;
    end(): Promise<void>;
    query(text: string, params?: any[]): Promise<any>;
  }
}

