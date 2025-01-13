import React from 'react';
import { useToast } from '@/hooks/useToast';
import { styled } from '@mui/material/styles';
import { formatBytes } from '@/utils/shared/utils';
import { Typography, Box, Button } from '@mui/material';

const ActionButton = styled(Button)({
	width: '250px',
	fontWeight: 600,
});

interface FilePageProps {
	signedUrl: string;
	fileName: string;
	size: number;
}

const FileDisplay: React.FC<FilePageProps> = ({ signedUrl, fileName, size }) => {
	const { showToast } = useToast();

	const handleDownload = async () => {
		try {
			const response = await fetch(signedUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			link.click();

			window.URL.revokeObjectURL(url);
			showToast({ message: 'File downloaded successfully', variant: 'success' });
		} catch (error) {
			console.error('Error downloading the file:', error);
			showToast({
				message: 'Error downloading the file. Please try again.',
				variant: 'error',
			});
		}
	};

	return (
		<Box
			sx={{
				textAlign: 'center',
			}}>
			<Typography
				variant='h1'
				color='text.secondary'>
				File is ready for download
			</Typography>
			<Typography variant='subtitle2'>
				Thanks for verifying your details. You can now download the document.
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					margin: '40px 0',
					gap: 2,
				}}>
				<Typography variant='subtitle2'>Document:</Typography>
				<Typography
					variant='subtitle2'
					color='primary'>
					{fileName} ({formatBytes(size)})
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: 40,
				}}>
				<ActionButton
					variant='contained'
					onClick={() => {
						window.open(signedUrl, '_blank');
					}}>
					View File
				</ActionButton>
				<ActionButton
					variant='contained'
					onClick={handleDownload}>
					Download File
				</ActionButton>
			</Box>
		</Box>
	);
};

export default FileDisplay;
