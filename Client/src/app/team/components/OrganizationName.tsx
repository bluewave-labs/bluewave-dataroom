'use client';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const OrganizationName = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [companyName, setCompanyName] = useState('Bluewave Labs');
	const inputRef = useRef<HTMLInputElement>(null);

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

	// Moves cursor to the end of Organization Name Textfield (Weird Requirment on figma)
	useEffect(() => {
		if (isEditing && inputRef.current) {
			const input = inputRef.current;
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	}, [isEditing]);

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			sx={{ marginBottom: '1rem' }}>
			<Typography variant="h3">Organization name</Typography>
			<Box display="flex" alignItems="center" height={5}>
				{isEditing ? (
					<TextField
						value={companyName}
						onChange={handleNameChange}
						variant="standard"
						size="small"
						inputRef={inputRef}
						sx={{
							marginRight: '1rem',
							'& .MuiInputBase-root': {
								padding: 0,
								fontSize: '1rem',
								height: 'auto',
							},
							'& .MuiInputBase-input': {
								marginRight: '-2.375rem',
								marginBottom: '-0.12rem',
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
	);
};

export default OrganizationName;
