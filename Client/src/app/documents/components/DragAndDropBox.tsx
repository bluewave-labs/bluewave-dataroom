'use client';
import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useFileInfoStore } from '@/store/useFileInfoStore';
import axios from 'axios';
import { useState } from 'react';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
}

const DragAndDropBox = ({ text, height = 250 }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const [uploading, setUploading] = useState(false);
	const { data: session } = useSession();
	const { fileInfo, setFileInfo, file, setFile } = useFileInfoStore();

	const handleUploadFile = async () => {
		console.log('entered uplaod');
		if (!session) {
			console.error('User not authenticated!');
			return;
		}

		if (!file) {
			console.error('No file selected!');
			return;
		}

		setUploading(true);

		console.log('entering formData');
		try {
			const formData = new FormData();
			formData.append('files', file, file.name); // Append the actual file object
			console.log('file', file);

			// Perform file upload via axios
			const response = await axios.post('/api/documents/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('Response:', response);

			if (response?.status === 200 && response.data?.documents) {
				console.log('File uploaded successfully');
				showToast({
					message: 'File Uploaded Successfully!',
					variant: 'success',
				});
			} else {
				console.error('File upload failed');
				showToast({
					message: 'File Upload Failed!',
					variant: 'success',
				});
			}
		} catch (error: any) {
			console.error('Error uploading file:', error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			{/* Box for drag-and-drop UI */}
			<Box
				onClick={openModal}
				sx={{
					border: '2px dashed rgba(236, 236, 236)',
					borderRadius: 2,
					padding: '2rem',
					textAlign: 'center',
					backgroundColor: 'rgba(255, 255, 255)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					cursor: 'pointer',
					height: { height },
				}}>
				<Box
					component='img'
					src='/assets/icons/documentPage/document-upload-icon.svg'
					alt='Document Icon'
					sx={{ width: '8rem', height: '8rem', mb: '0.5rem' }}
				/>
				<Button color='inherit'>{text}</Button>
			</Box>

			{/* Modal Wrapper */}
			<ModalWrapper
				variant='upload'
				dialogContentVariant='body2'
				title='Upload file(s)'
				description='Select up to 5 files to upload'
				confirmButtonText='Upload'
				toggleModal={closeModal}
				open={isOpen}
				onClose={handleUploadFile}
			/>
		</>
	);
};

export default DragAndDropBox;
