import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import prisma from '@lib/prisma';
import { Resend } from 'resend';
import { BluewaveEmail } from '../../../components/email-invite-member';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email, role } = await req.json();

		if (!email || typeof email !== 'string') {
			return NextResponse.json({ message: 'Invalid email provided' }, { status: 400 });
		}
		if (role && !['USER', 'ADMIN'].includes(role)) {
			return NextResponse.json({ message: 'Invalid role provided' }, { status: 400 });
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
		}

		const user = await prisma.user.create({
			data: {
				user_id: randomUUID(),
				email,
				role: role || 'USER',
				name: '', // Placeholder until user sets it
				password: '', // Placeholder until user sets it
			},
		});

		// Generate setup token and account URL
		const setupToken = randomUUID(); // Generate the token
		const setupAccountUrl = `${process.env.NEXTAUTH_URL}/auth/create-account/${setupToken}?email=${encodeURIComponent(email)}`;

		// Update user with the setup token
		await prisma.user.update({
			where: { id: user.id },
			data: { setupToken },
		});

		// Send invitation email
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: [user.email],
			subject: 'Account Setup Invitation',
			react: BluewaveEmail({
				username: user.name || 'New User',
				setupUrl: setupAccountUrl, // Use the generated setup URL
			}),
		});

		if (error) {
			return NextResponse.json(
				{ message: 'Failed to send invitation email', error: error.message },
				{ status: 500 }
			);
		}

		return NextResponse.json({ message: 'Invitation sent successfully', user }, { status: 201 });
	} catch (error) {
		console.error('Error inviting user:', error);
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
	}
}
