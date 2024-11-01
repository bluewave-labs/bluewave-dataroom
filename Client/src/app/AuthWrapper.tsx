import Breadcrumb from '@/components/Breadcrumb';
import Sidebar from './layout/Sidebar';
import { Box, CircularProgress, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import Background from '../../public/assets/Background';
// import SignIn from './signIn/page';
import SignIn from './auth/sign-in/page';

export default function AuthWrapper({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const pathname = usePathname(); // Get the current route path

	// Define the public routes
	const publicRoutes = [
		'/resetPass',
		'/register',
		'/auth/sign-up',
		'/auth/forgot-password',
		'/auth/reset-password',
		'/auth/account-created',
		'/auth/password-reset-confirm',
	];

	// Check if the current path starts with /resetPassForm, which is dynamic
	const isResetPassFormRoute = pathname.startsWith('/resetPassForm');

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

	// Render authenticated layout only when session is authenticated
	if (publicRoutes.includes(pathname) || isResetPassFormRoute) {
		return <>{children}</>;
	}

	const backgroundPosition = session ? 0 : -264;

	if (!session) {
		return (
			<>
				<Background backgroundPosition={backgroundPosition} />
				<SignIn />
			</>
		);
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
				<Box width="100%" py={20} paddingX={30}>
					{children}
				</Box>
			</Box>
		</>
	);
}
