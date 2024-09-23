'use client';

import { Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import PasswordForm from './PasswordForm';
import ProfileForm from './ProfileForm';

export default function ProfileClient() {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (_: any, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<>
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
		</>
	);
}
