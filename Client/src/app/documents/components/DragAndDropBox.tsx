'use client';

import { Box, Typography } from '@mui/material';
interface DragAndDropBoxProps {
	text: string;
}

const DragAndDropBox = ({ text }: DragAndDropBoxProps) => {
	const handleInput = (e: any) => {
		// Handle file upload logic here
		const file = e.target.files?.[0];
		if (file) {
			console.log('File selected:', file.name);
		}
	};

	return (
		<Box
			sx={{
				border: '2px dashed rgba(236, 236, 236)',
				borderRadius: '4px',
				padding: '2rem',
				textAlign: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.6)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				cursor: 'pointer',
				height: '250px',
			}}
			onClick={() => {
				// Trigger the file input click when box is clicked
				document.getElementById('file-input')?.click();
			}}>
			<Box
				component="img"
				src="/document-upload-icon.svg"
				alt="Document Icon"
				sx={{ width: '8rem', height: '8rem', marginBottom: '1rem' }}
			/>

			<Typography variant="body1" fontWeight={600}>
				{text}
			</Typography>
			<input
				type="file"
				id="file-input"
				style={{ display: 'none' }}
				onChange={handleInput}
			/>
		</Box>
	);
};

export default DragAndDropBox;
