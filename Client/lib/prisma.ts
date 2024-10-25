// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	// In production, create a single instance of PrismaClient
	prisma = new PrismaClient();
} else {
	// In development, use a global variable so that PrismaClient is not
	// created multiple times during hot reloading
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;
