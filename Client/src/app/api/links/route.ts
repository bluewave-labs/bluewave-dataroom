import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@lib/middleware/authenticate';
import LinkService from '@/services/linkService';
import bcryptjs from 'bcryptjs';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const userId = await authenticate(req);

		const searchParams = req.nextUrl.searchParams;
		const linkIdFromParams = searchParams.get('linkId');

		if (!linkIdFromParams) {
			return createErrorResponse('link Id is required.', 400);
		}

		const link = await LinkService.getLink(linkIdFromParams);
		if (!link) {
			return createErrorResponse('Link not found.', 404);
		}

		if (link.expirationTime && new Date(link.expirationTime) <= new Date()) {
			return NextResponse.json({ message: 'Link is expired' }, { status: 410 });
		}

		if (!link.hasSharingOptions && link.isPublic) {
			const signedUrl = await LinkService.getFileFromLink(linkIdFromParams);
			return NextResponse.json(
				{ message: 'Link URL generated', data: { signedUrl } },
				{ status: 200 },
			);
		} else {
			return NextResponse.json(
				{ message: 'Link has sharing options enabled', data: { link } },
				{ status: 200 },
			);
		}
	} catch (error) {
		return createErrorResponse('Server error.', 500, error);
	}
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const userId = await authenticate(req);
		const { documentId, friendlyName, isPublic, password, expirationTime, hasSharingOptions } =
			await req.json();

		if (!documentId) {
			return createErrorResponse('Document ID is required.', 400);
		}

		const { linkUrl, linkId } = LinkService.generateLinkDetails();

		if (expirationTime && new Date(expirationTime) < new Date()) {
			return createErrorResponse('Expiration time cannot be in the past.', 400);
		}

		const hashedPassword = password ? await bcryptjs.hash(password, 10) : null;

		const newLink = await prisma.link.create({
			data: {
				userId,
				linkId,
				linkUrl,
				documentId,
				isPublic: isPublic,
				password: hashedPassword,
				friendlyName: friendlyName || '',
				expirationTime: expirationTime || null,
				hasSharingOptions: hasSharingOptions || false,
			},
		});

		return NextResponse.json(
			{ message: 'Link created successfully.', link: newLink },
			{ status: 201 },
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
