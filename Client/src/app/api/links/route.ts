import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';
import LinkService from '@/services/linkService';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = await authenticate(req);

    const searchParams = req.nextUrl.searchParams;
    const linkIdFromParams = searchParams.get('linkId');

    if (!linkIdFromParams) {
      return createErrorResponse('link Id is required.', 400);
    }

    const signedUrl = await LinkService.getFileFromLink(linkIdFromParams);
    return NextResponse.json({ message: 'Link URL generated', data: { signedUrl } }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Server error.', 500, error);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = await authenticate(req);
    const { documentId, friendlyName, isPublic, emailRequired, passwordRequired, password, linkUrl, expirationTime } = await req.json();

    if (!documentId) {
      return createErrorResponse('Document ID is required.', 400);
    }

    const newLink = await prisma.link.create({
      data: {
        userId,
        documentId,
        friendlyName: friendlyName || "",
        linkUrl,
        isPublic: isPublic,
        emailRequired: emailRequired || false,
        passwordRequired: passwordRequired || false,
        password: password || null,
        expirationTime: expirationTime || null,
      },
    });

    return NextResponse.json(
      { message: 'Link created successfully.', link: newLink },
      { status: 201 }
    );
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
