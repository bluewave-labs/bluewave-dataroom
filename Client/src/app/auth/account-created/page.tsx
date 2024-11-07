'use client';
import LoadingButton from '@/components/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function AccountCreated() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleContinue = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			router.push('/auth/sign-in');
		}, 5000); // Mock delay
	};

	return (
		<AuthFormWrapper>
			<Box mb={10}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" my={10}>
				🎉 Woohoo! Account Created! 🎉
			</Typography>

			<Typography variant="subtitle2" textAlign="center">
				You did it! Your account is now live, and it's ready for action. Go ahead, click below, and
				let the magic begin! 🪄✨
			</Typography>

			<LoadingButton
				loading={loading}
				buttonText="Go to Sign In"
				loadingText="Loading..."
				onClick={handleContinue}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
