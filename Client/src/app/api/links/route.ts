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
    const { documentId, fileName, customName, isPublic, emailRequired, passwordRequired, linkPassword, linkUrl, expirationTime } = await req.json();

    if (!documentId) {
      return createErrorResponse('Document ID is required.', 400);
    }

    const newLink = await prisma.link.create({
      data: {
        userId,
        documentId,
        fileName: fileName || "",
        customName: customName || "",
        linkUrl,
        isPublic: isPublic || true,
        emailRequired: emailRequired || false,
        passwordRequired: passwordRequired || false,
        linkPassword: linkPassword || null,
        expirationTime: expirationTime || null,
        createdBy: userId,
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
  console.error(`[${new Date().toISOString()}] ${message}`, details);
  return NextResponse.json({ error: message, details }, { status });
}
