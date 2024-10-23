'use client';
import NavLink from '@/components/NavLink';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormLabel,
	TextField,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import KeyIcon from '../../../../public/assets/icons/auth/KeyIcon';

export default function ForgotPassword() {
	const router = useRouter();

	const [email, setEmail] = useState('your_email@bluewave.ca');
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		// Simulate sending reset email
		setTimeout(() => {
			setEmailSent(true);
			setLoading(false);

			router.push('/auth/email-sent');
		}, 5000); // Mock API delay
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
				<Box
					width={56}
					height={56}
					border="1px solid #EAECF0"
					display="flex"
					justifyContent="center"
					boxShadow="0px 1px 2px 0px #1018280D"
					alignItems="center"
					borderRadius="12px">
					{/* Insert Key Icon here */}
					<KeyIcon></KeyIcon>
				</Box>

				<Typography variant="h2" mb={4}>
					Forgot password?
				</Typography>

				<Typography
					variant="subtitle2"
					color="text.secondary"
					mb={4}
					textAlign="center">
					No worries, we'll send you reset instructions.
				</Typography>

				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					minWidth={400}
					display={'flex'}
					flexDirection={'column'}
					gap={5}>
					{/* Email Field */}
					<FormLabel htmlFor="email">
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							mb={1}>
							Email
						</Typography>
					</FormLabel>
					<TextField
						id="email"
						type="email"
						name="email"
						placeholder="Enter your email"
						size="small"
						autoComplete="email"
						required
						fullWidth
						variant="outlined"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Box
						mt={10}
						display="flex"
						justifyContent="center"
						flexDirection={'column'}
						alignItems="center"
						gap={8}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={loading}
							endIcon={
								loading ? <CircularProgress size={20} color="inherit" /> : null
							}>
							{loading ? 'Sending Instructions...' : 'Reset password'}
						</Button>

						<NavLink
							href="/auth/sign-in"
							linkText="← Back to sign in"
							prefetch={true}
						/>
					</Box>
				</Box>

				{/* Success Message for toast */}
				{emailSent && (
					<Typography variant="body1" color="success.main">
						A reset email has been sent to {email}.
					</Typography>
				)}
			</Box>
		</Container>
	);
}
