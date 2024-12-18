import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Create users
	const user1 = await prisma.user.create({
		data: {
			user_id: '1',
			first_name: 'sajan',
			last_name: 'ghuman',
			email: 'sajanghuman18@gmail.com',
			password: 'test',
			role: 'ADMIN',
			status: 'ACTIVE',
			verification_token: '123',
			token_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
			updated_at: new Date(),
			created_at: new Date(),
		},
	});

	const user2 = await prisma.user.create({
		data: {
			user_id: '2',
			first_name: 'mahid',
			last_name: 'ahmad',
			email: 'mahid@gmail.com',
			password: 'test',
			role: 'ADMIN',
			status: 'ACTIVE',
			verification_token: '123',
			token_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
			updated_at: new Date(),
			created_at: new Date(),
		},
	});

	const user3 = await prisma.user.create({
		data: {
			user_id: '3',
			first_name: 'parwat',
			last_name: 'kunwar',
			email: 'parwatkunwar1@gmail.com',
			password: 'test',
			role: 'ADMIN',
			status: 'ACTIVE',
			verification_token: '123',
			token_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
			updated_at: new Date(),
			created_at: new Date(),
		},
	});

	const user4 = await prisma.user.create({
		data: {
			user_id: '4',
			first_name: 'sepideh',
			last_name: 'shahbazi',
			email: 'sepideh.shahbazi@gmail.com',
			password: 'test',
			role: 'ADMIN',
			status: 'ACTIVE',
			verification_token: '123',
			token_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
			updated_at: new Date(),
			created_at: new Date(),
		},
	});

	console.log('Seeding completed.');
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
