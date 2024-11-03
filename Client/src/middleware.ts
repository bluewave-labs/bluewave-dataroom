// middleware.ts

import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/sign-in',
	},
});

export const config = {
	matcher: [
		'/((?!auth/sign-up|auth/forgotPassword|auth/resetPassword|auth/email-sent|api/user/resetPass|api/user/resetPassForm).*)',
	],
};
