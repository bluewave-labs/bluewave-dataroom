'use client';

import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { uploadFile } from '@/services/storageService';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, Dispatch, SetStateAction } from 'react';
import { Document } from '@/utils/shared/models';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
	setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
}

const DragAndDropBox = ({ text, height = 250, setDocuments }: DragAndDropBoxProps) => {
	const [uploading, setUploading] = useState(false);
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const { data: session } = useSession();

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
		if (!file) return;

		setUploading(true);

		try {
			if (!session) {
				console.error('User not authenticated!');
				handleNotAuthenticatedError();
				console.error('User not authenticated');
				setUploading(false);
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post('/api/documents/upload', formData);
			if (response?.status === 200 && response.data?.document) {
				setDocuments((prevDocuments) => [...prevDocuments, response.data.document]);
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
			const fileInput = document.getElementById('file-input') as HTMLInputElement;
			if (fileInput) {
				fileInput.value = '';
			}
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
		</>
	);
};

export default DragAndDropBox;
