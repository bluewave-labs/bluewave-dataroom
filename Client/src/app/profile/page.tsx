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
						src="https://avatar.iran.liara.run/public/boy?username=Ash" // Replace with your image path
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
						sx={{ backgroundColor: '#4C7DE7', paddingX: '4rem' }}>
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
						}}>
						Delete account
					</Button>
				</Box>
			</Box>
		</>
	);
}

function PasswordForm() {
	return <></>;
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
						aria-label="profile and password tabs">
						<Tab label="Profile" />
						<Tab label="Password" />
					</Tabs>
					<Divider sx={{ mb: '3rem' }} />
					{tabValue === 0 && <ProfileForm />}
					{tabValue === 1 && <PasswordForm />}
				</Box>
			</Container>
		</>
	);
}
