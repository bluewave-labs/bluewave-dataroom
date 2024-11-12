// This file will define the reset password functionality.
// Much of the code here was taken from this video tutorial: https://www.youtube.com/watch?v=vu78olWoV0I
// Other videos from the same channel are extremely helpful for someone learning prisma and next-auth

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import prisma from '@lib/prisma';
import { BluewaveResetPasswordEmail } from '../../../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.DOMAIN || 'localhost:3000';
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';

export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

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

	// If a password is provided, update the user's password directly
	if (password) {
		const hashedPassword = await hash(password, 10);

		try {
			await prisma.user.update({
				where: { email },
				data: { password: hashedPassword },
			});

			return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
		} catch (error) {
			console.error('Error updating password:', error);
			return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
		}
	}

	// Otherwise, proceed with sending a reset email (commented out for simplicity)
	const generatedToken = randomUUID();
	const token = await prisma.passwordResetToken.create({
		data: {
			token: generatedToken,
			User: {
				connect: { user_id: user.user_id },
			},
		},
	});

	const resetPasswordUrl = `${PROTOCOL}://${DOMAIN}/auth/reset-password/${token.token}`;

	const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: [user.email],
		subject: 'Password Reset Request',
		react: BluewaveResetPasswordEmail({
			username: user.first_name,
			resetUrl: resetPasswordUrl,
		}),
	});

	console.log(`Password reset email sent to ${user.email}`);
	return NextResponse.json({ message: 'Mail sent' }, { status: 201 });
}
