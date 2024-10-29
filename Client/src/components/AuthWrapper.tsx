import { useEffect, useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Sidebar from '../app/layout/Sidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import globalTheme from '@/utils/theme/globalTheme';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from '../app/auth/sign-in/page';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function AuthWrapper({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const pathname = usePathname(); // Get the current route path

    // Define the public routes
    const publicRoutes = ['/resetPass', '/register', '/auth/sign-up'];

    // Check if the current path starts with /resetPassForm, which is dynamic
    const isResetPassFormRoute = pathname.startsWith('/resetPassForm');

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
        return <div>Loading...</div>;
    }

    // If the current route is a public route or the dynamic reset password route, allow access without authentication
    const isPublicRoute = publicRoutes.includes(pathname) || isResetPassFormRoute;

    if (isPublicRoute) {
        return <>{children}</>; // Render children if the route is public
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
                    }}
                >
                    <Sidebar />
                    <Box
                        width="100%"
                        paddingTop={5}
                        paddingX={16}
                        sx={{
                            backgroundImage: 'url(/assets/doc-background.svg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                        <Breadcrumb />
                        {children}
                    </Box>
                </Container>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}

export default AuthWrapper;

