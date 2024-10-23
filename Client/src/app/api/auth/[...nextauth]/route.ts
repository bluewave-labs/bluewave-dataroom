// This file will handle the login logic next-auth. By default next-auth does not support register functionality so we have created it in a seprate folder called register/route.ts
// Much of the code in this file was taken from this video tutorial online: https://www.youtube.com/watch?v=2kgqPvs0j_I
// Other videos from the same channel are extremely helpful for someone learning prisma and next-auth
// Also the [...nextauth] is a catch all route in nextJS. Learn more about it here: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

// Import prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Bcryptjs is a npm library used to hash passwords
import bcryptjs from 'bcryptjs';
const { compare } = bcryptjs;
// Import next-auth and its helper functions
import NextAuth, {
	type NextAuthOptions,
	User as NextAuthUser,
} from 'next-auth';
import credentialsprovider from 'next-auth/providers/credentials';

// Basically saying, Everything returned by next-auth session + these properties(id, userId, role, name)
interface ExtendedUser extends NextAuthUser {
	id: string;
	userId: string;
	role: string;
	name: string;
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		credentialsprovider({
			name: 'Sign in',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'hello@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				//// For some reason, supabase does not store bigint values. Therefore for every file where id is fetched or stored, we have converted it to string first
				//console.log('User authorized:', {
				//	id: user.id.toString(), // Convert bigint to string
				//	userId: user.user_id,
				//	email: user.email,
				//	name: user.name,
				//	role: user.role,
				//});

				return {
					id: user.id.toString(), // Convert bigint to string
					userId: user.user_id,
					email: user.email,
					name: user.name,
					role: user.role,
				} as ExtendedUser;
			},
		}),
	],
	//Default signIn page route. Used for custom signIn pages
	pages: {
		signIn: '/signIn',
	},
	//we use a callback when we want something more than what is return by default from next-auth. In this case, we want the id, userId, name, and role
	callbacks: {
		async session({ session, token }) {
			// Debugging line: Log the session and token
			console.log('Session callback:', { session, token });

			//return the user in sessoin
			return {
				...session,
				user: {
					...session.user,
					id: token.id as string,
					userId: token.userId as string,
					role: token.role as string,
					name: token.name as string,
				},
			};
		},
		async jwt({ token, user }) {
			// Debugging line: Log the token and user
			console.log('JWT callback:', { token, user });

			//return the user
			if (user) {
				return {
					...token,
					id: (user as ExtendedUser).id,
					userId: (user as ExtendedUser).userId,
					role: (user as ExtendedUser).role,
					name: (user as ExtendedUser).name,
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
