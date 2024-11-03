import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import prisma from '@lib/prisma';

// Handle GET requests to fetch user details based on token
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get('token');

	if (!token) {
		return NextResponse.json({ message: 'Token is required' }, { status: 400 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { setupToken: token },
			select: { email: true }, // Return only the email for confirmation
		});

		if (!user) {
			return NextResponse.json({ message: 'Invalid or expired token' }, { status: 404 });
		}

		return NextResponse.json({ email: user.email }); // Return the user's email
	} catch (error) {
		console.error('Error fetching user details:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}

// Handle POST requests to create or update user account
export async function POST(request: Request) {
	const { token, name, password } = await request.json();

	if (!token || !name || !password) {
		return NextResponse.json(
			{ message: 'Token, name, and password are required' },
			{ status: 400 }
		);
	}

	try {
		// Verify token and get user
		const user = await prisma.user.findUnique({
			where: { setupToken: token },
		});

		if (!user) {
			return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
		}

		// Hash the password
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Update user with name, hashed password, and clear the setup token
		await prisma.user.update({
			where: { setupToken: token },
			data: {
				name,
				password: hashedPassword,
				setupToken: null, // Invalidate token after use
			},
		});

		return NextResponse.json({ message: 'Account created successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error creating account:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
