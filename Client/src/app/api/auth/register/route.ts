// This file defines the register login for the user
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Bcryptjs is a npm library used to hash passwords
import bcryptjs from 'bcryptjs';

// Import prisma
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
	try {
		//accept all the provided values
		const { email, password, name, role } = await req.json();

		const hashedPassword = await bcryptjs.hash(password, 10);

		// Then create a user
		const user = await prisma.user.create({
			data: {
				user_id: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				email,
				password: hashedPassword,
				name,
				role: role || 'USER', // default to USER if role is not provided
			},
		});

		return NextResponse.json(
			// Send a success message to the front-end
			{ message: 'User created successfully', user: user },
			{ status: 201 }
		);
	} catch (error) {
		// Catch any errors
		console.error('Error creating user:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
