import bcryptjs from 'bcryptjs';
import prisma from '@lib/prisma';
import LinkService from '@/services/linkService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { linkId, firstName, lastName, email, password } = await req.json();

    // if (!linkId || !firstName || !lastName || !email || !password) {
    //   return createErrorResponse('Link ID, firstName, lastName, email and password are required.', 400);
    // }

    const link = await LinkService.getLink(linkId);
    if (!link) {
      return createErrorResponse('Link not found.', 404);
    }

    if (!link.hasSharingOptions) {
      return createErrorResponse('This link does not require sharing options.', 400);
    }

    const isPasswordValid = await validatePassword(password, link.password as string);
    if (!isPasswordValid) {
      return createErrorResponse('Invalid password.', 403);
    }

    await logLinkVisitor(linkId, firstName, lastName, email);

    const signedUrl = await LinkService.getFileFromLink(linkId);
    return NextResponse.json({ message: 'Link URL generated', data: { signedUrl } }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Server error.', 500, error);
  }
}

function createErrorResponse(message: string, status: number, details?: any) {
  if (Array.isArray(details) && details.length === 2) {
    const [errorCode, errorMessage] = details;
    console.error(`[${new Date().toISOString()}] ${errorMessage}`, details);
    return NextResponse.json({ error: errorMessage, details }, { status: errorCode });
  } else {
    console.error(`[${new Date().toISOString()}] ${message}`, details);
    return NextResponse.json({ error: message, details }, { status });
  }
}

async function validatePassword(providedPassword: string, storedPassword: string) {
  return bcryptjs.compare(providedPassword, storedPassword);
}

async function logLinkVisitor(linkId: string, first_name: string, last_name: string, email: string) {
  return prisma.linkVisitors.create({
    data: {
      linkId,
      first_name,
      last_name,
      email,
    },
  });
}
