import { NextResponse } from 'next/server';
import { checkDatabaseConnection, prisma } from '@/lib/prisma';

/**
 * Health check endpoint for monitoring database connectivity
 * GET /api/health
 *
 * Returns:
 * - status: "healthy" | "unhealthy"
 * - database: { connected: boolean, latency?: number, error?: string }
 * - timestamp: ISO string
 * - version: Prisma version info
 */
export async function GET() {
  try {
    // Check database connection
    const dbHealth = await checkDatabaseConnection();

    // Get database info
    let databaseInfo = null;
    if (dbHealth.connected) {
      try {
        const result = await prisma.$queryRaw<Array<{ version: string }>>`SELECT version()`;
        databaseInfo = result[0]?.version || 'Unknown';
      } catch {
        // If we can't get version, that's okay
        databaseInfo = 'Connected but version unavailable';
      }
    }

    const isHealthy = dbHealth.connected;

    return NextResponse.json(
      {
        status: isHealthy ? 'healthy' : 'unhealthy',
        database: {
          connected: dbHealth.connected,
          latency: dbHealth.latency,
          error: dbHealth.error,
          version: databaseInfo,
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 503 }
    );
  }
}
