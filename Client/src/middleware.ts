import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/sign-in', // Redirect to /signIn for all unauthenticated routes
	},
});

// Middleware matcher configuration for Next.js
export const config = {
	matcher: [
		'/((?!register|resetPass|resetPassForm/.*|auth/sign-up).*)', // Protect all routes except /register, /resetPass, /resetPassForm/{token}, and /auth/sign-up
	],
};
