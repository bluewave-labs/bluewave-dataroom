import { useEffect, useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Sidebar from '../app/layout/Sidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from '../app/auth/sign-in/page';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function AuthWrapper({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const router = useRouter();

	const publicRoutes = ['/auth/sign-up', '/auth/forgotPassword', '/auth/email-sent'];
	const isResetPassRoute = pathname.startsWith('/auth/resetPassword');
	const isResetPassFormRoute = pathname.startsWith('/api/user/resetPassFrom');

	const [isLoading, setIsLoading] = useState(false);
	const [isRedirecting, setIsRedirecting] = useState(false);

	//useEffect(() => {
	//	const checkUserCount = async () => {
	//		try {
	//			const res = await fetch('/api/user/count');
	//			const { count } = await res.json();
	//
	//			if (count === 0 && pathname !== '/auth/create-admin') {
	//				setIsRedirecting(true);
	//				router.push('/auth/create-admin');
	//			} else {
	//				setIsLoading(false);
	//			}
	//		} catch (error) {
	//			console.error('Error checking user count:', error);
	//			setIsLoading(false);
	//		}
	//	};
	//
	//	checkUserCount();
	//}, [pathname, router]);

	if (isLoading || status === 'loading' || isRedirecting) {
		return <div>Loading...</div>;
	}

	const isPublicRoute = publicRoutes.includes(pathname) || isResetPassFormRoute || isResetPassRoute;
	if (isPublicRoute) {
		return <>{children}</>;
	}

	if (!session) {
		return (
			<Box>
				<h1>Please log in</h1>
				<SignIn />
			</Box>
		);
	}

	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={globalTheme}>
				<CssBaseline />
				<Container
					sx={{
						display: 'flex',
						backgroundColor: '#fcfcfd',
						height: '100vh',
						minWidth: '100vw',
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
	);
}

export default AuthWrapper;
