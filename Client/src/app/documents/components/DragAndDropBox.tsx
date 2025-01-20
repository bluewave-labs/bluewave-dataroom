'use client';
import { Box, Button } from '@mui/material';

import ModalWrapper from '@/components/ModalWrapper';

import { useModal, useToast } from '@/hooks';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
}

const DragAndDropBox = ({ text, height = 250 }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();

	const handleUploadFile = () => {
		console.log('File Uploaded Successfully!');
		showToast({
			message: 'File Uploaded Successfully!',
			variant: 'success',
		});
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
