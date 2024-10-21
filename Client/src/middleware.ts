import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/app/auth/sign-in',
	},
});
