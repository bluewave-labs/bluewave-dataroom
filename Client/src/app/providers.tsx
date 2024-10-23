'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from './signIn/page';

export default function Providers({ children }: { children: React.ReactNode }) {
	// Ensure the client-side has mounted before rendering
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

	// Show a loading state while fetching the session
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	// If user is not authenticated, show the login form
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
								backgroundImage:
									'url(/assets/icons/documentPage/doc-background.svg)',
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
