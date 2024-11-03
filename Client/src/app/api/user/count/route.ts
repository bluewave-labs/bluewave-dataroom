import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust this path as necessary

export async function GET() {
	try {
		const userCount = await prisma.user.count();
		return NextResponse.json({ count: userCount });
	} catch (error) {
		console.error('Error fetching user count:', error);
		return NextResponse.json({ error: 'Failed to fetch user count' }, { status: 500 });
	}
}
