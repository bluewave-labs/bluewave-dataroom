import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

import Providers from './providers'; // Client-side provider for auth

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Blw-Dataroom',
	description: 'Share documents safely with your team and customers',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider theme={globalTheme}>
					<CssBaseline />
					{/* Wrapping the client-side part */}
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
