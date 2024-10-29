// This file will define the reset password functionality.
// Much of the code here was taken from this video tutorial: https://www.youtube.com/watch?v=vu78olWoV0I
// Other videos from the same channel are extremely helpful for someone learning prisma and next-auth

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { render } from '@react-email/render';
import { BluewaveResetPasswordEmail } from '../../../../components/email-template';

// npm library for cryting a string
import { randomUUID } from 'crypto';

// Import prisma
import prisma from '@lib/prisma';

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
		// Generate the token string by concatenating two UUIDs and removing hyphens
		const generatedToken = randomUUID();
		// Store the token in Prisma
		const token = await prisma.passwordResetToken.create({
			data: {
				token: generatedToken,
				User: {
					connect: { user_id: user.user_id }, // Connecting to the user by user_id
				},
			},
		});

		const resetPasswordUrl = `${PROTOCOL}://${DOMAIN}/resetPassForm/${token.token}`;

		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [user.email],
			subject: 'Password Reaset Request',
			react: BluewaveResetPasswordEmail({
				username: user.name,
				resetUrl: resetPasswordUrl,
			}),
		});

		// Confirm success with 201 status
		console.log(`Password reset email sent to ${user.email}`);
		return NextResponse.json({ message: 'Mail sent' }, { status: 201 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error during password reset process:', error.message);

			// Type assertion to access response safely
			const apiError = error as { response?: { body?: any } };

			// Check if response exists and log it
			if (apiError.response && apiError.response.body) {
				console.error('API error:', apiError.response.body);
			}

			return NextResponse.json(
				{ message: 'Internal server error' },
				{ status: 500 }
			);
		} else {
			console.error('Unexpected error:', error);
			return NextResponse.json(
				{ message: 'Internal server error' },
				{ status: 500 }
			);
		}
	}
}
