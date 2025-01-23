'use client';
import React from 'react';
import { Box, Button } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

import ModalWrapper from '@/components/ModalWrapper';
import { useDropzone } from 'react-dropzone';

import { useModal, useToast } from '@/hooks';
import axios from 'axios';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
}

const DragAndDropBox = ({ text, height = 250 }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();
	const { data: session } = useSession();
	const [uploading, setUploading] = React.useState(false);
	const router = useRouter();

	const onDrop = React.useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0];

		handleFileSelect(file);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleUploadSuccess = () => {
		showToast({ message: 'File uploaded successfully!', variant: 'success' });
	};

	const handleUploadError = (msg?: string) => {
		const errorMsg = msg || 'File uploading failed!';
		showToast({ message: errorMsg, variant: 'error' });
	};


	const handleFileSelect = async (file: File | undefined) => {
		if (!file) return;

		setUploading(true);

		try {
			if (!session) {
				handleUploadError('User not authenticated!');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const response = await axios.post('/api/documents/upload', formData);

			if (response?.status === 200 && response.data?.document) {
				handleUploadSuccess();
				//TODO: Temporary fix, until we use tanstack query or zustand
				setTimeout(() => {
					router.refresh();
				}, 1000);
			} else {
				handleUploadError('Server responded with an error.');
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error || error.message || 'Unexpected error occurred.';
			handleUploadError(errorMessage);
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			{/* Box for drag-and-drop UI */}
			<div {...getRootProps()}>
				<input {...getInputProps({ accept: 'image/png, application/pdf, image/jpeg', multiple: false })} />
				<Box
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
				{/* <ModalWrapper
				variant='upload'
				dialogContentVariant='body2'
				title='Upload file(s)'
				description='Select up to 5 files to upload'
				confirmButtonText='Upload'
				toggleModal={closeModal}
				open={isOpen}
				onClose={handleUploadFile}
			/> */}
			</div>
		</>
	);
};

export default DragAndDropBox;
