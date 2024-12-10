import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = await authenticate(req);
    const { documentId } = await req.json();

    if (!documentId) {
      return createErrorResponse('Document ID is required.', 400);
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.user_id !== userId) {
      return createErrorResponse('Document not found or access denied.', 404);
    }

    await prisma.document.delete({
      where: { id: documentId },
    });

    return NextResponse.json({ message: 'Document deleted successfully.' }, { status: 200 });
  } catch (error) {
    return createErrorResponse('Server error.', 500, error);
  }
}

function createErrorResponse(message: string, status: number, details?: any) {
  console.error(`[${new Date().toISOString()}] ${message}`, details);
  return NextResponse.json({ error: message, details }, { status });
}
