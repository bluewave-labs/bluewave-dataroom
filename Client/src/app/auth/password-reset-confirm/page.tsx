'use client';
import LoadingButton from '@/components/LoadingButton';
import { Box, Typography, Button } from '@mui/material';
import { FormEvent, useState, useEffect } from 'react';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';
import AuthFormWrapper from '../components/AuthFormWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function PasswordResetConfirm() {
	const [loading, setLoading] = useState(false);
	const [signedIn, setSignedIn] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();

	const email = searchParams.get('email');
	const password = searchParams.get('password');

	const handleSignIn = async () => {
		setLoading(true);

		if (email && password) {
			const signInResult = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			if (signInResult?.error) {
				console.error('Sign-in failed:', signInResult.error);
			} else {
				setSignedIn(true);
			}
		}

		setLoading(false);
	};

	// Automatically redirect to the dashboard after successful sign-in
	useEffect(() => {
		if (signedIn) {
			router.push('/documents'); // Redirect to the dashboard
		}
	}, [signedIn, router]);

	return (
		<AuthFormWrapper>
			<Box
				width={56}
				height={56}
				border="1px solid #EAECF0"
				display="flex"
				justifyContent="center"
				boxShadow="0px 1px 2px 0px #1018280D"
				alignItems="center"
				borderRadius="12px">
				<CheckIcon color="outline" width={28} height={28} />
			</Box>

			<Typography variant="h2" my={10}>
				Password Reset Successfully!
			</Typography>

			<Typography variant="subtitle2" textAlign="center">
				Your password has been successfully reset. Click below to log in magically.
			</Typography>

			<LoadingButton
				loading={loading}
				buttonText="Sign In"
				loadingText="Signing In..."
				onClick={handleSignIn}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
