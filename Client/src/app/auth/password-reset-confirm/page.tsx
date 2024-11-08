'use client';
import LoadingButton from '@/components/LoadingButton';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function PasswordResetConfirm() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleContinue = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			router.push('/auth/sign-in');
		}, 5000); // Mock delay for visual effect
	};

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
				buttonText="Go to Sign In"
				loadingText="Loading..."
				onClick={handleContinue}
				fullWidth
			/>
		</AuthFormWrapper>
	);
}
