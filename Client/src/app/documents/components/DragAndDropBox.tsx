'use client';
import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import { Box, Button } from '@mui/material';

interface DragAndDropBoxProps {
	text: string;
	height?: string;
}

const DragAndDropBox = ({ text, height }: DragAndDropBoxProps) => {
	const { isOpen, openModal, closeModal } = useModal();

	const handleInput = () => {
		console.log('File selected');
	};

	// Handle file upload logic here
	// const handleInput = (e: any) => {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		console.log('File selected:', file.name);
	// 	}
	// };

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
				height: { height },
			}}>
			<Box
				component="img"
				src="/assets/icons/documentPage/document-upload-icon.svg"
				alt="Document Icon"
				sx={{ width: '8rem', height: '8rem', marginBottom: '1rem' }}
			/>
			<Button color="inherit" onClick={openModal}>
				{text}
			</Button>

			<input type="file" id="file-input" style={{ display: 'none' }} onChange={handleInput} />

			<ModalWrapper
				variant="upload"
				title="Upload a new file"
				confirmButtonText="Upload"
				toggleModal={closeModal}
				open={isOpen}
				onClose={handleInput}
				maxFileSize="50"
				fileFormats="PDF"
			/>
		</Box>
	);
};

export default DragAndDropBox;
