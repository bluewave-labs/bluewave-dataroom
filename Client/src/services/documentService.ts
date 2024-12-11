import prisma from '@lib/prisma';

export async function fetchDocumentCount(): Promise<number> {
	try {
		return await prisma.document.count();
	} catch (error) {
		console.error('Error fetching document count:', error);
		return 0; // Return a safe fallback value
	}
}
