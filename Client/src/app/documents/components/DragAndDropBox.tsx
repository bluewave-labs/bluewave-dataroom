'use client';
import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import { Box, Button } from '@mui/material';
import UploadDocumentIcon from '../../../../public/assets/icons/documentPage/UploadDocumentIcon';

interface DragAndDropBoxProps {
	text: string;
	height?: number;
}

const DragAndDropBox = ({ text, height = 250 }: DragAndDropBoxProps) => {
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
		<>
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
				<Box mb="0.5rem">
					<UploadDocumentIcon />
				</Box>
				<Button color="inherit">{text}</Button>
				<input type="file" id="file-input" style={{ display: 'none' }} onChange={handleInput} />
			</Box>
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
		</>
	);
};

export default DragAndDropBox;
