'use client';

import {
	Container,
	Button,
	Box,
	Divider,
	IconButton,
	Typography,
	TextField,
} from '@mui/material';
import FilterToggle from './components/FilterToggle';
import UserTable from './components/UserTable';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export default function TeamPage() {
	const [filterRole, setFilterRole] = useState<
		'All' | 'Administrator' | 'Member'
	>('All');

	const [isEditing, setIsEditing] = useState(false);
	const [companyName, setCompanyName] = useState('Bluewave Labs');

	const handleFilterChange = (role: 'All' | 'Administrator' | 'Member') => {
		setFilterRole(role);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		// Add code here to save the updated name to the backend if needed
		console.log('Saved:', companyName);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyName(event.target.value);
	};

	return (
		<>
			<Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
				<Typography variant="h5" sx={{ color: 'primary.main' }}>
					Team
				</Typography>
				<Divider sx={{ marginBottom: '1rem' }} />
				<Typography
					variant="body2"
					sx={{ color: 'text.secondary', marginBottom: '4rem' }}>
					Set up your team here.
				</Typography>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					sx={{ marginBottom: '1rem' }}>
					<Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
						Organization name
					</Typography>
					<Box display="flex" alignItems="center" height={5}>
						{isEditing ? (
							<TextField
								value={companyName}
								onChange={handleNameChange}
								variant="standard"
								size="small"
								sx={{
									marginRight: '1rem',
									'& .MuiInputBase-root': {
										padding: 0,
										fontSize: '1rem',
										height: 'auto',
									},
									'& .MuiInputBase-input': {
										marginRight: '-2rem',
										padding: '1px 0px 1px 5px',
										fontSize: '1rem',
										fontWeight: 'normal',
									},
								}}
							/>
						) : (
							<Typography
								variant="body1"
								sx={{
									marginRight: '3rem',
									fontSize: '1rem',
									padding: '4px 9.9px 2px 1px',
									fontWeight: 'normal',
								}}>
								{companyName}
							</Typography>
						)}
						<IconButton
							size="small"
							onClick={isEditing ? handleSaveClick : handleEditClick}>
							{isEditing ? (
								<SaveIcon fontSize="small" />
							) : (
								<EditIcon fontSize="small" />
							)}
						</IconButton>
					</Box>
				</Box>
				<Divider sx={{ marginY: '4rem' }} />
				<Typography
					sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '2rem' }}>
					Team Members
				</Typography>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<FilterToggle
						currentFilter={filterRole}
						onFilterChange={handleFilterChange}
					/>
					<Button
						variant="contained"
						color="primary"
						sx={{
							textTransform: 'none',
						}}>
						Invite team member
					</Button>
				</Box>
				<Box marginTop="2rem">
					<UserTable filterRole={filterRole} />
				</Box>
			</Container>
		</>
	);
}
