'use client';
import ModalWrapper from '@/components/ModalWrapper';
import Toast from '@/components/Toast';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { uploadFile } from '@/services/storageService';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
}

const DragAndDropBox = ({ text, height = 250 }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const [uploading, setUploading] = useState(false);
	const successToast = useToast();
	const errorToast = useToast();
	const { data: session } = useSession();

	// Handle file selection
	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);

		try {
			if (!session) {
				console.error('User not authenticated');
				// errorToast.showToast();
				setUploading(false);
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post('/api/documents/upload', formData);

			if (response?.status === 200 && response.data?.document) {
				// successToast.showToast();
			} else {
				// errorToast.showToast();
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Unexpected error occurred';
			console.error('Error uploading file:', errorMessage, error);
			// errorToast.showToast();
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			{/* Box for drag-and-drop UI */}
			<Box
				onClick={() => document.getElementById('file-input')?.click()}
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
				<input
					type='file'
					id='file-input'
					accept='.pdf'
					style={{ display: 'none' }}
					onChange={handleFileSelect}
				/>
			</Box>

			{/* Modal Wrapper */}
			{/* <ModalWrapper
				variant="upload"
				title="Upload a new file"
				confirmButtonText="Upload"
				toggleModal={closeModal}
				open={isOpen}
				onClose={handleUpload}
				maxFileSize="50"
				fileFormats="PDF"
			/> */}
			{/* <Toast
				message="File uploaded successfully"
				open={successToast.open}
				hideToast={successToast.hideToast}
				variant="success"
				autoHide
			/>
			<Toast
				message="File upload failed"
				open={errorToast.open}
				hideToast={errorToast.hideToast}
				variant="error"
				autoHide
			/> */}
		</>
	);
};

export default DragAndDropBox;
