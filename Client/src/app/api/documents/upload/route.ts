import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/services/storageService';
import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
	try {
		const userId = await authenticate(req);

		const data = await req.formData();
		const files = data.getAll('files'); // Get all files from the form data

		if (files.length === 0) {
			return NextResponse.json({ message: 'No files found.', status: 404 });
		}

		// Process each file
		const fileUploadPromises = files.map(async (file: File) => {
			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);

			// Upload the file using the storage service
			const uploadResult = await uploadFile(buffer, {
				fileName: file.name,
				userId,
				fileType: file.type,
			});

			if (!uploadResult) {
				throw new Error(`Failed to upload file: ${file.name}`);
			}

			// Save the file details in the database
			const document = await prisma.document.create({
				data: {
					user_id: userId,
					fileName: file.name,
					filePath: uploadResult,
					fileType: file.type,
					size: file.size,
				},
			});

			return document; // Return the document for each file
		});

		// Wait for all file uploads to complete
		const documents = await Promise.all(fileUploadPromises);

		// Respond with success and the uploaded documents
		return NextResponse.json(
			{ message: 'Files uploaded successfully.', documents },
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
