// Import necessary modules
import prisma from '@lib/prisma';
import bcryptjs from 'bcryptjs';
import NextAuth, { type NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define an extended user interface
interface ExtendedUser extends NextAuthUser {
	id: string;
	userId: string;
	role: string;
	name: string;
}

// NextAuth options
export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password are required');
				}

				// Find user in database
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				console.log('User:', user); // Debug log

				// Check if the user exists and if their status is ARCHIVED
				if (!user) {
					throw new Error('No user found with the provided email');
				}
				if (user.status === 'UNVERIFIED') {
					throw new Error('Please verify your email to sign in.');
				}

				// Validate password
				const isPasswordValid = await bcryptjs.compare(credentials.password, user.password);
				if (!isPasswordValid) {
					throw new Error('Invalid password');
				}

				// Return user object to the JWT callback
				return {
					id: user.id.toString(),
					userId: user.user_id,
					email: user.email,
					name: user.first_name,
					role: user.role,
				} as ExtendedUser;
			},
		}),
	],
	pages: {
		signIn: '/auth/sign-in',
	},
	callbacks: {
		async session({ session, token }) {
			// console.log('Session token:', token); // Debug log
			// Explicitly set user properties in session
			if (token) {
				session.user = {
					id: token.id as string,
					userId: token.userId as string,
					role: token.role as string,
					name: token.name as string,
					email: token.email as string,
				};
			}
			return session;
		},
		async jwt({ token, user }) {
			// If the user object exists, merge it with the token
			if (user) {
				// console.log('JWT user:', user); // Debug log
				token.id = user.id;
				token.userId = user.userId;
				token.role = user.role;
				token.name = user.name;
			}
			return token;
		},
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };