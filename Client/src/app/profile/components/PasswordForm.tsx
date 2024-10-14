import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Correct Grid2 import from MUI
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
		<Box component="form" noValidate autoComplete="off">
			<Grid
				container
				rowSpacing={14}
				columnSpacing={{ xs: 5, sm: 10, md: 55 }}
				alignItems="center">
				{/* Current Password */}
				<Grid size={5}>
					<Typography variant="h2">Current Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size="small"
						id="current-password"
						variant="outlined"
						fullWidth
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</Grid>

				{/* New Password */}
				<Grid size={5}>
					<Typography variant="h2">New Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size="small"
						id="new-password"
						variant="outlined"
						fullWidth
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</Grid>

				{/* Confirm Password */}
				<Grid size={5}>
					<Typography variant="h2">Confirm Password</Typography>
				</Grid>
				<Grid size={7}>
					<TextField
						size="small"
						id="confirm-password"
						variant="outlined"
						fullWidth
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Grid>

				<Grid size={7} offset={'auto'}>
					<Box sx={{ height: 100 }}>
						{error && <Alert severity="warning">{error}</Alert>}
					</Box>
				</Grid>
			</Grid>

			{/* Save Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 30 }}>
				<Button
					variant="contained"
					size="medium"
					color="primary"
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
}
