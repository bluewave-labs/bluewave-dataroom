'use client';

import globalTheme from '@/utils/theme/globalTheme';
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AuthWrapper from './AuthWrapper';

export default function Providers({ children }: { children: React.ReactNode }) {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		// Show a loading spinner while the client-side is hydrating
		return <CircularProgress />;
	}

	return (
		<SessionProvider>
			<AppRouterCacheProvider>
				<ThemeProvider theme={globalTheme}>
					<CssBaseline />
					<AuthWrapper>{children}</AuthWrapper>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</SessionProvider>
	);
}
