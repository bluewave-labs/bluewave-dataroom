import { Box, Container, Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import PasswordForm from './components/PasswordForm';
import ProfileForm from './components/ProfileForm';

export default function ProfilePage() {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Container maxWidth="lg" sx={{ pb: '15rem', pt: '4rem' }}>
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
	);
}
