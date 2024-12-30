import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const userId = await authenticate(req);

		// Query the database for documents owned by the authenticated user
		const documents = await prisma.document.findMany({
			where: { user_id: userId },
			select: {
				id: true,
				fileName: true,
				filePath: true,
				document_id: true,
				fileType: true,
				size: true,
				createdAt: true,
				updatedAt: true,
				User: {
					select: {
						first_name: true,
						last_name: true,
					},
				},
			},
			orderBy: { createdAt: 'desc' },
		});

		// Respond with the list of documents
		return NextResponse.json(
			{
				documents: documents.map((doc) => ({
					...doc,
					uploader: {
						name: `${doc.User.first_name} ${doc.User.last_name}`,
						avatar: null, // Add avatar logic
					},
					links: 0, // Placeholder
					viewers: 0, // Placeholder
					views: 0, // Placeholder
				})),
			},
			{ status: 200 },
		);
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
