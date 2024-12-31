import bcryptjs from 'bcryptjs';
import prisma from '@lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = await authenticate(req);

    const visitors = await prisma.linkVisitors.groupBy({
      by: ['email'],
      _count: {
        email: true,
      },
      _max: {
        updatedAt: true,
      },
    });

    const visitorDetails = await Promise.all(visitors.map(async (visitor) => {
      const lastVisit = await prisma.linkVisitors.findFirst({
        where: { email: visitor.email },
        orderBy: { updatedAt: 'desc' },
        include: { Link: true },
      });

      return {
        firstName: lastVisit?.first_name || 'N/A',
        lastName: lastVisit?.last_name || 'N/A',
        email: visitor.email || 'N/A',
        lastViewedLink: lastVisit?.Link?.linkUrl || lastVisit?.Link.friendlyName || 'N/A',
        lastActivity: lastVisit?.updatedAt || 'N/A',
        totalVisits: visitor._count.email,
      };
    }));

    return NextResponse.json({ data: visitorDetails }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Server error.', 500, error);
  }
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
