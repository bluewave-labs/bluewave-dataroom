import Breadcrumb from '@/components/Breadcrumb';
import { Box, CircularProgress, Container } from '@mui/material';
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
		'/auth/sign-up',
		'/auth/forgot-password',
		'/auth/reset-password',
		'/auth/account-created',
		'/auth/password-reset-confirm',
		'/auth/check-email',
	];

	// Check if the current path starts with /resetPassForm, which is dynamic
	const isResetPassFormRoute = pathname.startsWith('/auth/reset-password');

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
			<Container
				sx={{
					display: 'flex',
					backgroundColor: '#fcfcfd',
					height: '100vh',
					pt: 16,
					pb: 12,
					gap: 16,
				}}>
				<Sidebar />
				<Box width="100%" paddingTop={5} paddingX={16}>
					<Breadcrumb />
					{children}
				</Box>
			</Container>
		</>
	);
}
