'use client';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';

export default function PasswordResetConfirm() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleContinue = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 5000); // Mock delay
		router.push('/auth/sign-in');
	};

	return (
		<Container
			component="main"
			sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				mt={8}
				gap={10}>
				{/* Icon Placeholder */}
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
					Password reset
				</Typography>

				<Typography variant="subtitle2" textAlign="center">
					Your password has been successfully reset. Click below to log in
					magically.
				</Typography>

				{/* Continue Button */}
				<Box
					display="flex"
					justifyContent="center"
					flexDirection={'column'}
					alignItems="center"
					gap={8}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleContinue}
						disabled={loading}
						endIcon={
							loading ? <CircularProgress size={20} color="inherit" /> : null
						}>
						{loading ? 'Processing...' : 'Continue'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
