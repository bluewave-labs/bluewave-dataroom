import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { Typography, Box, Link } from '@mui/material';

import BlueWaveLogo from '../../../public/assets/BluewaveLogo';

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
					<Box>
						<BlueWaveLogo
							width={191}
							height={24}
						/>
					</Box>
					<Box>
						{children}
					</Box>
					<Box sx={{
						display:'flex',
						alignItems: 'center',
					}}>
						<Typography sx={{ color: '#555', mb: 1 }}>
							Need help?
						</Typography> &nbsp;
						<Link href="" underline="hover">
							Contact Support
						</Link>
					</Box>
				</Box>
			</body>
		</html>
	);
}
