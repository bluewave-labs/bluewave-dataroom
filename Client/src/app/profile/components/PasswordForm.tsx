import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function PasswordForm() {
	const { data: session } = useSession();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSave = async () => {
		// Clear previous messages
		setError('');
		setSuccess('');

		// Basic validation
		if (
			newPassword.length < 8 ||
			!/[A-Z]/.test(newPassword) ||
			!/\d/.test(newPassword) ||
			!/[!@#$%^&*]/.test(newPassword)
		) {
			setError(
				'New password must contain at least 8 characters and must have at least one uppercase letter, one number, and one symbol.',
			);
			return;
		}

		if (newPassword !== confirmPassword) {
			setError('New password and confirmation password do not match.');
			return;
		}

		try {
			// Make the POST request
			const response = await axios.post('/api/profile/changePassword', {
				email: session?.user.email,
				currentPassword: currentPassword,
				newPassword: newPassword,
			});

			// Handle success
			if (response.status === 200) {
				setError('');
				setSuccess('Password updated successfully!');
				setCurrentPassword('');
				setNewPassword('');
				setConfirmPassword('');
			}
		} catch (error: unknown) {
			// Narrowing down the type of `error`
			if (axios.isAxiosError(error)) {
				// Axios-specific error handling
				if (error.response) {
					// Server responded with an error
					setError(`Error: ${error.response.data.error}`);
				} else if (error.request) {
					// No response received
					setError('Error: No response from server. Please try again later.');
				} else {
					// Other Axios error
					setError(`Error: ${error.message}`);
				}
			} else if (error instanceof Error) {
				// Generic error handling
				setError(`Error: ${error.message}`);
			} else {
				// Fallback for unknown error types
				setError('An unexpected error occurred.');
			}
		}
	};

	return (
		<Box
			component='form'
			noValidate
			autoComplete='off'>
			<Grid
				container
				rowSpacing={14}
				columnSpacing={{ xs: 5, sm: 10, md: 55 }}
				alignItems='center'>
				{/* Current Password */}
				<Grid size={5}>
					<Typography variant='h3'>Current Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size='small'
						id='current-password'
						variant='outlined'
						fullWidth
						type='password'
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</Grid>

				{/* New Password */}
				<Grid size={5}>
					<Typography variant='h3'>New Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size='small'
						id='new-password'
						variant='outlined'
						fullWidth
						type='password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</Grid>

				{/* Confirm Password */}
				<Grid size={5}>
					<Typography variant='h3'>Confirm Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size='small'
						id='confirm-password'
						variant='outlined'
						fullWidth
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Grid>

				{/* Error and Success Messages */}
				<Grid
					size={7}
					offset={'auto'}>
					<Box sx={{ height: 100 }}>
						{error && <Alert severity='warning'>{error}</Alert>}
						{success && <Alert severity='success'>{success}</Alert>}
					</Box>
				</Grid>
			</Grid>

			{/* Save Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 30 }}>
				<Button
					variant='contained'
					size='medium'
					color='primary'
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
}
