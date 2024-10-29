'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import AuthWrapper from '@/components/AuthWrapper';

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
