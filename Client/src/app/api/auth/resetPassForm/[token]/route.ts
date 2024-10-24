// This file will define the login for updating the password, after the user is confirmed to be valid
// The file uses dynamic routes to accept a token created during earlier
// Learn more about dynamic routes here: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { token, password } = await req.json();

		// Validate token and password
		if (
			!token ||
			typeof token !== 'string' ||
			!password ||
			typeof password !== 'string'
		) {
			console.error('Error: Token or password are either missing or not valid');
			return NextResponse.json(
				{ message: 'Token or password are either missing or not valid' },
				{ status: 400 }
			);
		}

		// Find the password reset token
		const passToken = await prisma.passwordResetToken.findUnique({
			where: {
				token: token,
				created_at: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) }, // Token valid for 4 hours
				reset_at: null,
			},
		});

		// If token is not found or expired
		if (!passToken) {
			return NextResponse.json(
				{ message: 'Token not valid. Please try again' },
				{ status: 400 }
			);
		}

		// Encrypt the new password
		const encrypted = await hash(password, 10);

		// Update user's password
		const updateUser = prisma.user.update({
			where: {
				user_id: passToken.user_id,
			},
			data: {
				password: encrypted,
			},
		});

		// Update the password reset token to mark it as used
		const updateToken = prisma.passwordResetToken.update({
			where: {
				id: passToken.id,
			},
			data: {
				reset_at: new Date(),
			},
		});

		// Commit the transaction
		await prisma.$transaction([updateToken, updateUser]);

		// Send success response
		return NextResponse.json(
			{ message: 'Password updated successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error updating password:', error);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
