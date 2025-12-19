import { NextResponse } from 'next/server';

/**
 * Health Check API Endpoint
 * Tests server connectivity and returns status
 */
export async function GET() {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        server: 'running',
        api: 'available',
      },
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

