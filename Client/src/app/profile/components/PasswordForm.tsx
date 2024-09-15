'use client';

import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function PasswordForm() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleSave = () => {
		// Basic validation
		if (
			newPassword.length < 8 ||
			!/[A-Z]/.test(newPassword) ||
			!/\d/.test(newPassword) ||
			!/[!@#$%^&*]/.test(newPassword)
		) {
			setError(
				'New password must contain at least 8 characters and must have at least one uppercase letter, one number, and one symbol.'
			);
			return;
		}

		if (newPassword !== confirmPassword) {
			setError('New password and confirmation password do not match.');
			return;
		}

		setError('');
		console.log('Password updated successfully');
	};

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { width: '100%', maxWidth: '30rem' },
			}}
			noValidate
			autoComplete="off">
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: 4,
					justifyContent: 'space-between',
				}}>
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					Current Password
				</Typography>
				<TextField
					size="small"
					id="current-password"
					variant="outlined"
					fullWidth
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: 4,
					justifyContent: 'space-between',
				}}>
				<Typography variant="body1" sx={{ fontWeight: '600' }}>
					New Password
				</Typography>
				<TextField
					size="small"
					id="new-password"
					variant="outlined"
					fullWidth
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					mb: 4,
					justifyContent: 'space-between',
				}}>
				<Typography variant="body1" sx={{ fontWeight: '600', mt: 1 }}>
					Confirm Password
				</Typography>
				<Box sx={{ width: '100%', maxWidth: '30rem' }}>
					<TextField
						size="small"
						id="confirm-password"
						variant="outlined"
						fullWidth
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					{error && (
						<Alert
							severity="warning"
							sx={{
								mt: 5,
								fontSize: '1rem',
								'& .MuiAlert-icon': { fontSize: '1.5rem' },
								border: '2px solid #ffcc00',
							}}>
							{error}
						</Alert>
					)}
				</Box>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15, mb: 5 }}>
				<Button
					variant="contained"
					size="large"
					sx={{ backgroundColor: '#4C7DE7', paddingX: '4rem' }}
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
}
