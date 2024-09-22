'use client';

import { Box, Typography } from '@mui/material';
interface DragAndDropBoxProps {
	text: string;
}

const DragAndDropBox = ({ text }: DragAndDropBoxProps) => {
	return (
		<Box
			sx={{
				border: '2px dashed #CBD5E0',
				borderRadius: '8px',
				padding: '2rem',
				textAlign: 'center',
				backgroundColor: '#F7FAFC',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				cursor: 'pointer',
				height: '220px',
			}}
			onClick={() => {
				// Trigger the file input click when box is clicked
				document.getElementById('file-input')?.click();
			}}>
			<Box
				component="img"
				src="/documentUpload.svg"
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
				onChange={(e) => {
					// Handle file upload logic here
					const file = e.target.files?.[0];
					if (file) {
						console.log('File selected:', file.name);
					}
				}}
			/>
		</Box>
	);
};

export default DragAndDropBox;
