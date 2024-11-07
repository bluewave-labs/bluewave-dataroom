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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import KeyIcon from '../../../../public/assets/icons/auth/KeyIcon';

export default function ForgotPassword() {
	const router = useRouter();
	const [email, setEmail] = useState('your_email@bluewave.ca');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setErrorMessage(''); // Clear any previous error messages

		try {
			// API call to check if the email exists in the database
			const response = await axios.post('/api/auth/verify-email', { email });

			// If email is verified, navigate to the reset password page with email as a parameter
			if (response.status === 200) {
				router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
			}
		} catch (error) {
			console.error('Error verifying email:', error);
			setErrorMessage('Email not found. Please try again or sign up.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box display="flex" flexDirection="column" alignItems="center" mt={8} gap={10}>
				<Box
					width={56}
					height={56}
					border="1px solid #EAECF0"
					display="flex"
					justifyContent="center"
					boxShadow="0px 1px 2px 0px #1018280D"
					alignItems="center"
					borderRadius="12px">
					<KeyIcon />
				</Box>

				<Typography variant="h2" mb={4}>
					Forgot password?
				</Typography>

				<Typography variant="subtitle2" color="text.secondary" mb={4} textAlign="center">
					No worries, we’ll send you reset instructions.
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
						<Typography color="text.primary" fontSize={15} fontWeight={500} mb={1}>
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
							endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
							{loading ? 'Verifying Email...' : 'Reset password'}
						</Button>

						<NavLink href="/auth/sign-in" linkText="← Back to sign in" prefetch={true} />
					</Box>
				</Box>

				{/* Error Message for Invalid Email */}
				{errorMessage && (
					<Typography variant="body1" color="error" mt={2}>
						{errorMessage}
					</Typography>
				)}
			</Box>
		</Container>
	);
}
