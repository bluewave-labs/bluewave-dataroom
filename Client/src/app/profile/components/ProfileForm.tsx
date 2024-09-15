'use client';

import {
	Avatar,
	Box,
	Button,
	Divider,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

export default function ProfileForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [photo, setPhoto] = useState('');

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
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
					<TextField
						size="small"
						id="last-name"
						variant="outlined"
						fullWidth
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
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
					<TextField
						size="small"
						id="email"
						variant="outlined"
						disabled
						fullWidth
						placeholder="mahid@acme.com"
					/>
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
						src="https://picsum.photos/200/200"
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
