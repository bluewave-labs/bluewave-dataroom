import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import BlueWaveWelcomeEmail from '../../../../components/welcome_email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email, password, firstName, lastName, role } = await req.json();

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: 'User with this email already exists.' },
				{ status: 409 }
			);
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = randomUUID();

		// Create a new user with a 'PENDING' status
		const user = await prisma.user.create({
			data: {
				user_id: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				email,
				password: hashedPassword,
				first_name: firstName,
				last_name: lastName,
				role: role || 'ADMIN',
				status: 'UNVERIFIED', // Account status is pending until verification
				verification_token: verificationToken, // Store token for verification
				token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24-hour expiration
			},
		});

		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [user.email],
			subject: 'Verify Your Email',
			react: BlueWaveWelcomeEmail({
				username: user.first_name,
				verificationLink: `localhost:3000/auth/account-created/?token=${verificationToken}`,
			}),
		});

		if (error) {
			console.error('Email sending failed:', error);
			return NextResponse.json({ message: 'Failed to send verification email' }, { status: 500 });
		}

		return NextResponse.json(
			{ message: 'Verification email sent. Please check your inbox.' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
