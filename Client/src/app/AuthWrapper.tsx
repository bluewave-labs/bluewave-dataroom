import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Background from '../../public/assets/Background';
import SignIn from './auth/sign-in/page';
import Sidebar from './layout/Sidebar';

export default function AuthWrapper({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const pathname = usePathname(); // Get the current route path

	// Define the public routes
	const publicRoutes = [
		'/auth/sign-up',
		'/auth/forgot-password',
		'/auth/reset-password',
		'/auth/account-created',
		'/auth/password-reset-confirm',
		'/auth/check-email',
	];

	// Check if the current path starts with /auth/reset-password, which is dynamic
	const isResetPassFormRoute =
		pathname.startsWith('/auth/reset-password') && pathname.includes('reset-password');

	// Local state to handle loading state
	const [isLoading, setIsLoading] = useState(true);

	// useEffect to handle session status changes
	useEffect(() => {
		if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status]);

	// Show a loading state while fetching the session
	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				<CircularProgress size={80} />
			</Box>
		);
	}

	// If the user is trying to access a restricted route and is not signed in, redirect to the sign-in page
	if (!session && !publicRoutes.includes(pathname) && !isResetPassFormRoute) {
		// Redirect the user to the sign-in page with a callback URL
		return <SignIn />;
	}

	// Render authenticated layout only when session is authenticated
	if (publicRoutes.includes(pathname) || isResetPassFormRoute) {
		return <>{children}</>;
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					backgroundColor: '#fcfcfd',
					height: '100vh',
				}}>
				<Sidebar />
				<Box width="100%" py={20} px={30}>
					{children}
				</Box>
			</Box>
		</>
	);
}
