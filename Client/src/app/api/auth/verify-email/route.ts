import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	if (!email) {
		return NextResponse.json({ message: 'Email is required' }, { status: 400 });
	}

	// Check if the user exists with the provided email
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		return NextResponse.json({ message: 'Email not found' }, { status: 404 });
	}

	// If user exists, respond with success
	return NextResponse.json({ message: 'Email verified' }, { status: 200 });
}
