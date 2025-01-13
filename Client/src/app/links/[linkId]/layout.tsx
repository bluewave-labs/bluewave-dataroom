import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Typography, Box, Link } from '@mui/material';

import BlueWaveLogo from '../../../../public/assets/BluewaveLogo';

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
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'column',
					padding: 20,
					height: '100vh',
				}}>
					<BlueWaveLogo
						width={400}
						height={40}
					/>
					{children}
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1
					}}>
						<Typography>
							Need help?
						</Typography>
						<Link href="" underline="hover">
							Contact Support
						</Link>
					</Box>
				</Box>
			</body>
		</html>
	);
}
