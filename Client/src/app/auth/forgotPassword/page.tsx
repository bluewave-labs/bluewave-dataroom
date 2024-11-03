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
import axios from 'axios'; // Ensure axios is imported

export default function ForgotPassword() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post('/api/user/resetPass', { email });

			if (response.status === 200) {
				setEmailSent(true);
				// router.push('/auth/email-sent');
			} else {
				setMessage(
					response.data.message || 'Failed to send reset password link. Please try again.'
				);
			}
		} catch (error) {
			console.error('Error during axios request:', error);
			setMessage(
				error.response?.data?.message || 'Failed to send reset password link. Please try again.'
			);
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
					{/* Insert Key Icon here */}
					<KeyIcon />
				</Box>

				<Typography variant="h2" mb={4}>
					Forgot password?
				</Typography>

				<Typography variant="subtitle2" color="text.secondary" mb={4} textAlign="center">
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
						onChange={(e) => setEmail(e.target.value)} // Update email state based on user input
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
							{loading ? 'Sending Instructions...' : 'Reset password'}
						</Button>

						<NavLink href="/auth/sign-in" linkText="← Back to sign in" prefetch={true} />
					</Box>
				</Box>

				{/* Success Message for toast */}
				{emailSent && (
					<Typography variant="body1" color="success.main">
						A reset email has been sent to {email}
					</Typography>
				)}

				{/* Error Message for toast */}
				{message && (
					<Typography variant="body1" color="error.main">
						{message}
					</Typography>
				)}
			</Box>
		</Container>
	);
}
