import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/signIn', // Redirect to /signIn for all unauthenticated routes
	},
});

// Middleware matcher configuration for Next.js
export const config = {
	matcher: [
		'/((?!register|resetPass|resetPassForm/.*).*)', // Protect all routes except /register, /resetPass, and /resetPassForm/{token}
	],
};
