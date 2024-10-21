import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Box, Container } from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blw-Dataroom",
  description: "Share documents safely with your team and customers",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

	return (
		<html lang="en">
			<body className={inter.className}>
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
			</body>
		</html>
	);
}
