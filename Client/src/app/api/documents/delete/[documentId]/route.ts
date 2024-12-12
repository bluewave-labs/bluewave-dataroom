import prisma from '@lib/prisma';
import { deleteFile } from '@/services/storageService';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';

export async function DELETE(req: NextRequest, { params }: { params: { documentId: string } }): Promise<NextResponse> {

  try {
    const userId = await authenticate(req);
    const documentId = +params.documentId;

    if (!documentId) {
      return createErrorResponse('Document ID is required.', 400);
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document || document.user_id !== userId) {
      return createErrorResponse('Document not found or access denied.', 404);
    }

    const deletedFile = await prisma.document.delete({
      where: { id: documentId },
    });

    await deleteFileFromStorage(deletedFile.filePath);

    return NextResponse.json(
      { message: 'Document deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    return createErrorResponse('Server error.', 500, error);
  }
}

async function deleteFileFromStorage(filePath: string) {
  try {
    await deleteFile(filePath);
  } catch (error) {
    throw error;
  }
}

function createErrorResponse(message: string, status: number, details?: any) {
  return NextResponse.json({ error: message, details }, { status });
}
