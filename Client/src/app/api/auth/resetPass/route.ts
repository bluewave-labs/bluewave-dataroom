// This file will define the reset password functionality.
// Much of the code here was taken from this video tutorial: https://www.youtube.com/watch?v=vu78olWoV0I
// Other videos from the same channel are extremely helpful for someone learning prisma and next-auth

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';
import prisma from '@lib/prisma';
import { BluewaveResetPasswordEmail } from '../../../auth/components/ForgotPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export async function POST(req: NextRequest) {
	const { email } = await req.json();

	if (!email || typeof email !== 'string') {
		console.error('Error: Missing or invalid email field');
		return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
	}

	// Check if the user exists in the database
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		console.error(`Error: No user found with email ${email}`);
		return NextResponse.json({ message: 'Email is not registered' }, { status: 400 });
	}

	// Generate the token
	const generatedToken = randomUUID();
	const token = await prisma.passwordResetToken.create({
		data: {
			token: generatedToken,
			User: {
				connect: { user_id: user.user_id },
			},
		},
	});

	// Generate the reset password URL with email and token as query parameters
	const resetPasswordUrl = `${PROTOCOL}://${DOMAIN}/auth/reset-password?token=${generatedToken}&email=${encodeURIComponent(user.email)}`;

	// Send the email
	const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: [user.email],
		subject: 'Password Reset Request',
		react: BluewaveResetPasswordEmail({
			username: user.first_name,
			resetUrl: resetPasswordUrl,
		}),
	});

	if (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}

	console.log(`Password reset email sent to ${user.email}`);
	return NextResponse.json({ message: 'Mail sent' }, { status: 201 });
}
