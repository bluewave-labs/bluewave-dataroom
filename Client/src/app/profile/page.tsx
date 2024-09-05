'use client';

import Button from '@mui/material/Button';
import {
	Alert,
	Avatar,
	Box,
	Container,
	Divider,
	Link,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import styles from './page.module.css';
import { useState } from 'react';

function ProfileForm() {
	const handleSave = () => {
		console.log('Profile Updated Successfully!');
	};
	const handleDelete = () => {
		console.log('Account Deleted Successfully!');
	};

	return (
		<>
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
						First name
					</Typography>
					<TextField
						size="small"
						id="first-name"
						variant="outlined"
						fullWidth
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
						Last name
					</Typography>
					<TextField size="small" id="last-name" variant="outlined" fullWidth />
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						mb: 4,
						justifyContent: 'space-between',
					}}>
					<Box>
						<Typography variant="body1" sx={{ fontWeight: '600' }}>
							Email
						</Typography>
						<Typography variant="body2" color="textSecondary">
							This is your current email address — it cannot be changed.
						</Typography>
					</Box>
					<TextField size="small" id="email" variant="outlined" fullWidth />
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
					<Box sx={{ flexGrow: 0.55 }}>
						<Typography variant="body1" fontWeight="bold">
							Your photo
						</Typography>
						<Typography variant="body2" color="textSecondary">
							This photo will be displayed in your profile page.
						</Typography>
					</Box>
					<Avatar
						alt="Profile Picture"
						src="https://picsum.photos/200/200" // Replace with your profile image
						sx={{ width: 56, height: 56, mr: 2 }}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Link
							href="#"
							underline="hover"
							color="textSecondary"
							sx={{ mr: 2 }}>
							Delete
						</Link>
						<Link href="#" underline="hover" color="primary">
							Update
						</Link>
					</Box>
				</Box>
				<Box
					sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15, mb: 5 }}>
					<Button
						variant="contained"
						size="large"
						sx={{ backgroundColor: '#4C7DE7', paddingX: '4rem' }}
						onClick={handleSave}>
						Save
					</Button>
				</Box>

				<Divider sx={{ mb: 4 }} />

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						mb: 4,
						rowGap: '0.8rem',
					}}>
					<Typography variant="body1" fontWeight="bold">
						Delete account
					</Typography>
					<Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
						Note that deleting your account will remove all data from our
						system. This is permanent and non-recoverable.
					</Typography>
					<Button
						variant="contained"
						size="large"
						sx={{
							backgroundColor: '#DB504A',
							paddingX: '3rem',
							maxWidth: '15rem',
							mt: '1rem',
						}}
						onClick={handleDelete}>
						Delete account
					</Button>
				</Box>
			</Box>
		</>
	);
}

// function PasswordForm() {
// 	return (
// 		<Box
// 			component="form"
// 			sx={{
// 				'& .MuiTextField-root': { width: '100%', maxWidth: '30rem' },
// 			}}
// 			noValidate
// 			autoComplete="off">
// 			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
// 				<Typography variant="body1" sx={{ fontWeight: '600' }}>
// 					Current Password
// 				</Typography>
// 				<TextField size="small" id="password" variant="outlined" fullWidth type="password" />
// 			</Box>
// 			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
// 				<Typography variant="body1" sx={{ fontWeight: '600' }}>
// 					Password
// 				</Typography>
// 				<TextField size="small" id="newPassword" variant="outlined" fullWidth type="password" />
// 			</Box>
// 			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
// 				<Typography variant="body1" sx={{ fontWeight: '600' }}>
// 					Confirm Password
// 				</Typography>
// 				<TextField size="small" id="confirm-password" variant="outlined" fullWidth type="password" />
// 			</Box>
// 			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15, mb: 5 }}>
// 				<Button variant="contained" size="large" sx={{ backgroundColor: '#4C7DE7', paddingX: '4rem' }}>
// 					Save
// 				</Button>
// 			</Box>
// 		</Box>
// 	);
// }

function PasswordForm() {
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
		// Proceed with save logic (e.g., API call)
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
					Password
				</Typography>
				<TextField
					size="small"
					id="newPassword"
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
								'& .MuiAlert-icon': {
									fontSize: '1.5rem',
								},
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

export default function Page() {
	const [tabValue, setTabValue] = useState(0);
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};
	return (
		<>
			<Container
				maxWidth="lg"
				sx={{ backgroundColor: '#FCFCFD', pb: '15rem', pt: '4rem' }}>
				<Box sx={{ width: '100%', margin: '0 auto' }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						sx={{
							'& .MuiButtonBase-root': {
								textTransform: 'none',
							},
						}}
						aria-label="profile and password tabs">
						<Tab label="Profile" sx={{ fontSize: '1rem' }} />
						<Tab label="Password" sx={{ fontSize: '1rem' }} />
					</Tabs>
					<Divider sx={{ mb: '3rem' }} />
					{tabValue === 0 && <ProfileForm />}
					{tabValue === 1 && <PasswordForm />}
				</Box>
			</Container>
		</>
	);
}
