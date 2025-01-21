'use client';
import { Box, Button } from '@mui/material';

import ModalWrapper from '@/components/ModalWrapper';

import { useModal, useToast } from '@/hooks';

interface DragAndDropBoxProps {
	text: string;
	height?: { [key: string]: number };
}

const DragAndDropBox = ({ text, height = { sm: 150, md: 200, lg: 250 } }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const { showToast } = useToast();

	const handleUploadFile = () => {
		console.log('File uploaded successfully!');
		showToast({
			message: 'File uploaded successfully!',
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
					p: { sm: '1rem', md: '1.5rem', lg: '2rem' },
					bgcolor: 'background.fill',
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
					width={{ sm: '7rem', md: '7.5rem', lg: '8rem' }}
					height={{ sm: '7rem', md: '7.5rem', lg: '8rem' }}
					mb={{ sm: '0.1rem', md: '0.3rem', lg: '0.5rem' }}
				/>
				<Button color='secondary'>{text}</Button>
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
