'use client';
import LoadingButton from '@/components/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function AccountCreated() {
	const [loading, setLoading] = useState(true);
	const [statusMessage, setStatusMessage] = useState('');
	const [isVerified, setIsVerified] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	//useEffect(() => {
	//	// Fetch verification status from the API
	//	const verifyEmail = async () => {
	//		try {
	//			const response = await fetch(`/api/auth/verify-email?token=${token}`);
	//			const data = await response.json();
	//
	//			if (response.ok) {
	//				setIsVerified(true);
	//				setStatusMessage('🎉 Woohoo! Account Verified! 🎉');
	//			} else {
	//				setIsVerified(false);
	//				setStatusMessage(data.message || 'Verification failed. The link may be expired.');
	//			}
	//		} catch (error) {
	//			setIsVerified(false);
	//			setStatusMessage('An error occurred. Please try again.');
	//		} finally {
	//			setLoading(false);
	//		}
	//	};
	//
	//	if (token) verifyEmail();
	//}, [token]);

	const handleContinue = () => {
		router.push('/auth/sign-in');
	};

	return (
		<AuthFormWrapper>
			<Box mb={10}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" my={10}>
				{statusMessage}
			</Typography>

			{/*		<Typography variant="subtitle2" textAlign="center">
				{isVerified
					? "You did it! Your account is now live, and it's ready for action. Go ahead, click below, and let the magic begin! 🪄✨"
					: 'It seems there was an issue with the verification. Please try again or contact support if the problem persists.'}
			</Typography>
      */}

			<Typography variant="subtitle2" textAlign="center">
				"Please request your account admin to verify your email"
			</Typography>

			<LoadingButton
				loading={loading}
				buttonText="Go to Sign In"
				loadingText="Verifying..."
				onClick={handleContinue}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
