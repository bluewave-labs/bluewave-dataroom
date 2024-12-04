import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import SignIn from './auth/sign-in/page';
import Sidebar from './layout/Sidebar';

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

	if (!session) {
		return (
			<>
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
					minHeight: '100vh',
				}}>
				<Sidebar />
				<Box
					sx={{
						width: '100%',
						py: { sx: 4, sm: 10, md: 20 },
						px: { sx: 8, sm: 16, md: 30 },
					}}>
					{children}
				</Box>
			</Box>
		</>
	);
}
