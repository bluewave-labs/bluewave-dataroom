'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Sidebar from './layout/Sidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from './signIn/page';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return null; // or return a loading spinner
	}

	return (
		<SessionProvider>
			<AuthWrapper>{children}</AuthWrapper>
		</SessionProvider>
	);
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const pathname = usePathname(); // Get the current route path

	// Define the public routes (including dynamic routes like /resetPassForm/[token])
	const publicRoutes = ['/resetPass', '/register'];

	// Check if the current path starts with /resetPassForm, which is dynamic
	const isResetPassFormRoute = pathname.startsWith('/resetPassForm');

	// Show a loading state while fetching the session
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	// If the current route is a public route or the dynamic reset password route, allow access without authentication
	if (publicRoutes.includes(pathname) || isResetPassFormRoute) {
		return <>{children}</>;
	}

	// If user is not authenticated and the route is protected, show the login form
	if (!session) {
		return (
			<Box>
				<h1>Please log in</h1>
				<SignIn />
			</Box>
		);
	}

	// If user is authenticated, render the application layout
	return (
		<>
			<AppRouterCacheProvider>
				<ThemeProvider theme={globalTheme}>
					<CssBaseline />
					<Container
						sx={{
							display: 'flex',
							backgroundColor: '#fcfcfd',
							height: '100vh',
							maxWidth: '1600px',
							minWidth: '1600px',
							pt: 16,
							pb: 12,
							gap: 16,
						}}>
						<Sidebar />
						<Box
							width="100%"
							paddingTop={5}
							paddingX={16}
							sx={{
								backgroundImage: 'url(/assets/doc-background.svg)',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
							}}>
							<Breadcrumb />
							{children}
						</Box>
					</Container>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</>
	);
}
