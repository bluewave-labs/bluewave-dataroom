'use client';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Title from '../../../../public/assets/BluewaveLogo';

export default function AccountCreated() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleContinue = async (event: FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			router.push('/documents');
		}, 5000); // Mock delay
	};

	return (
		<Container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box display="flex" flexDirection="column" alignItems="center" mt={8} gap={15}>
				<Box mb={10}>
					<Title width={244} height={64} />
				</Box>

				<Typography variant="h2" my={10}>
					🎉 Woohoo! Account Created! 🎉
				</Typography>

				<Typography variant="subtitle2" textAlign="center">
					You did it! Your account is now live, and it's ready for action. Go ahead, click below,
					and let the magic begin! 🪄✨
				</Typography>

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
						endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
						{loading ? 'Loading...' : 'Go to dashboard'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
