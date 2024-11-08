import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		// Extract values from the request
		const { email, password, name, role } = await req.json();

		// Check if a user with the provided email already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			// If user exists, return a conflict status with a specific message
			return NextResponse.json(
				{ message: 'User with this email already exists.' },
				{ status: 409 }
			);
		}

		// Hash the password
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Create a new user
		const user = await prisma.user.create({
			data: {
				user_id: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				email,
				password: hashedPassword,
				name,
				role: role || 'USER', // default to USER if role is not provided
			},
		});

		return NextResponse.json({ message: 'User created successfully', user: user }, { status: 201 });
	} catch (error) {
		// Handle other errors
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
