// This file will define the reset password functionality.
// Much of the code here was taken from this video tutorial: https://www.youtube.com/watch?v=vu78olWoV0I
// Other videos from the same channel are extremely helpful for someone learning prisma and next-auth

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// npm library for cryting a string
import { randomUUID } from 'crypto';

// Import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	if (!email || typeof email !== 'string') {
		console.error('Error: Missing or invalid email field');
		return NextResponse.json(
			{ message: 'Missing required fields' },
			{ status: 400 }
		);
	}

	// Find the user
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		// If the user does not exists, return 404 status
		if (!user) {
			console.error(`Error: No user found with email ${email}`);
			return NextResponse.json(
				{ message: 'Email is not registered' },
				{ status: 400 }
			);
		}

		// Create a token with crypto
		const token = await prisma.passwordResetToken.create({
			data: {
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				User: {
					connect: { user_id: user.user_id }, // Connecting to the user by user_id
				},
			},
		});

		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['sajanghuman18@gmail.com'],
			subject: 'Hello world',
			react: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: ${PROTOCOL}://${DOMAIN}/resetPassForm/${token.token}

              For security reasons, this link is only valid for four hours.

              If you did not request this reset, please ignore this email.`,
		});

		// Confirm success with 201 status
		console.log(`Password reset email sent to ${user.email}`);
		return NextResponse.json({ message: 'Mail sent' }, { status: 201 });
	} catch (error: any) {
		//using any type, as there is no way of knowing what kind of error the code throw back

		// Else return error
		console.error('Error during password reset process:', error);
		if (error.response && error.response.body) {
			console.error('Mailgun API error:', error.response.body);
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
