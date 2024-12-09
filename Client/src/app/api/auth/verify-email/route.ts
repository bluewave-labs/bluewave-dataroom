import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get('token');

	if (!token) {
		return NextResponse.json({ message: 'Verification token missing' }, { status: 400 });
	}

	// Use 'findFirst' since 'verification_token' might not be unique
	const user = await prisma.user.findFirst({
		where: { verification_token: token },
	});

	if (!user || user.token_expires_at < new Date()) {
		return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
	}

	// Update user status and clear the token fields
	await prisma.user.update({
		where: { email: user.email },
		data: {
			status: 'ACTIVE',
			verification_token: undefined, // Clear token
			token_expires_at: undefined, // Clear token expiration
		},
	});

	return NextResponse.json({ message: 'Email verified successfully!' }, { status: 200 });
}
