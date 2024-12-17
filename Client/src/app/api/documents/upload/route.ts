import { uploadFile } from '@/services/storageService';
import { authenticate } from '@lib/middleware/authenticate';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const userId = await authenticate(req);

		// Extract the file from the form data
		const formData = await req.formData();
		const file = formData.get('file');
		if (!(file instanceof File) || !file.name) {
			return createErrorResponse('Invalid file type or missing file.', 400);
		}

		// Convert File to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrayBuffer);

		// Upload the file using the storage service
		const uploadResult = await uploadFile(fileBuffer, {
			fileName: file.name,
			userId,
			fileType: file.type,
		});

		if (!uploadResult) {
			return createErrorResponse('File upload failed.', 500);
		}

		// Save the file details in the database
		const document = await prisma.document.create({
			data: {
				user_id: userId,
				fileName: file.name,
				filePath: uploadResult, // Store the file path from upload result
				fileType: file.type,
				size: file.size,
			},
			include: {
				User: {
					select: {
						first_name: true,
						last_name: true,
					},
				},
			}
		});

		const updatedDocument = {
			...document,
			uploader: {
				name: `${document.User.first_name} ${document.User.last_name}`,
				avatar: null,
			},
			links: 0,
			viewers: 0,
			views: 0,
		};

		// Respond with success
		return NextResponse.json({
			message: 'File uploaded successfully.', document: updatedDocument
		}, { status: 200 });
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

function createErrorResponse(message: string, status: number, details?: any) {
	console.error(`[${new Date().toISOString()}] ${message}`, details);
	return NextResponse.json({ error: message, details }, { status });
}
