import { NextResponse } from 'next/server';
import { runAllTests } from '@/lib/utils/connectionTest';

/**
 * Connection Test API Endpoint
 * Tests all connections: Web, Database, APIs
 */
export async function GET() {
  try {
    const testResults = await runAllTests();
    return NextResponse.json(testResults, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        overall: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

