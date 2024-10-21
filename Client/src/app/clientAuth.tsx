// ClientAuth.tsx
'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import SignIn from './signIn/page';

interface ClientAuthProps {
	serverSession: any; // This is passed from the server component
	children: React.ReactNode;
}

export default function ClientAuth({
	serverSession,
	children,
}: ClientAuthProps) {
	const [isMounted, setIsMounted] = useState(false);

	// Ensure this component only renders after the client-side is ready
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		// Prevent rendering on initial load to avoid hydration mismatch
		return null;
	}

	return (
		<SessionProvider session={serverSession}>
			<AuthChecker>{children}</AuthChecker>
		</SessionProvider>
	);
}

function AuthChecker({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();

	// While loading, show loading indicator
	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	// If no session, show the login form
	if (!session) {
		return (
			<Container
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}>
				<SignIn />
			</Container>
		);
	}

	// If there's a session, show the app layout
	return (
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
	);
}
