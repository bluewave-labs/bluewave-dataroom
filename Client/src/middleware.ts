import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/sign-in', // Redirect to /sign-in for all unauthenticated routes
	},
});

export const config = {
	matcher: [
		'/((?!register|resetPass|resetPassForm/.*|auth/sign-up|auth/forgot-password|auth/reset-password|auth/account-created|auth/password-reset-confirm).*)',
		// Protect all routes except /register, /resetPass, /resetPassForm/{token}, /auth/sign-up, /auth/forgot-password, /auth/reset-password, /auth/account-created, and /auth/reset-password-confirm
	],
};
