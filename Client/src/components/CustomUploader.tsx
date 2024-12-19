import useFileInfo from '@/hooks/useFileInfo';
import { useToast } from '@/hooks/useToast';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface CustomUploaderProps {
	fileFormats?: string;
	fileInfo: { name: string; size: string; type: string };
	handleFileInfo: React.Dispatch<
		React.SetStateAction<{ name: string; size: string; type: string }>
	>;
}

export default function CustomUploader({
	fileFormats,
	fileInfo,
	handleFileInfo,
}: CustomUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const { data: session } = useSession();
	const { showToast } = useToast();
	const { formatFileSize } = useFileInfo();

	const handleUploadFile = () => {
		console.log('File Uploaded Successfully!');
		showToast({
			message: 'File Uploaded Successfully!',
			variant: 'success',
		});
	};

	const handleFailedFileError = () => {
		console.log('File Uploading Failed!');
		showToast({
			message: 'File Uploading Failed!',
			variant: 'error',
		});
	};

	const handleNotAuthenticatedError = () => {
		console.log('User not authenticated!');
		showToast({
			message: 'User not authenticated!',
			variant: 'error',
		});
	};

	// Handle file selection
	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const formattedFileSize = formatFileSize(file.size);
			handleFileInfo((prevFileInfo) => ({
				...prevFileInfo,
				name: file.name,
				size: formattedFileSize,
				type: file.type,
			}));
		} else {
			return;
		}

		setUploading(true);

		try {
			if (!session) {
				console.error('User not authenticated!');
				handleNotAuthenticatedError();
				setUploading(false);
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post('/api/documents/upload', formData);

			if (response?.status === 200 && response.data?.document) {
				handleUploadFile();
			} else {
				handleFailedFileError();
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Unexpected error occurred';
			console.error('Error uploading file:', errorMessage, error);
			handleFailedFileError();
		} finally {
			setUploading(false);
		}
	};

	return (
		<Box display='flex'>
			<TextField
				value={fileInfo.name}
				size='small'
				fullWidth
			/>
			<Button
				variant='outlined'
				color='inherit'
				size='small'
				sx={{
					borderColor: 'text.notes',
					ml: 10,
					fontSize: 13,
					minWidth: '6rem',
				}}
				onClick={() => document.getElementById('file-input')?.click()}>
				Browse
			</Button>
			<input
				type='file'
				id='file-input'
				accept={fileFormats === 'JPG, PNG' ? 'image/*' : 'application/pdf'}
				style={{ display: 'none' }}
				onChange={handleFileSelect}
			/>
		</Box>
	);
}
