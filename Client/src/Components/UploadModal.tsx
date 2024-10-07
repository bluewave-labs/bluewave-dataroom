import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';
import Image from 'next/image';

import UploadIcon from '../../public/assets/icons/uploadModel/upload-cloud-icon.svg';

interface UploadModalProps {
	title: string;
	description: string;
	maxFileSize: string;
	fileFormats: string;
	confirmButtonText: string;
	cancelButtonText?: string;
	toggleModal: (show: boolean) => void;
	showModal: boolean;
}

export default function UploadModal({
	title,
	description,
	maxFileSize,
	fileFormats,
	confirmButtonText,
	cancelButtonText,
	toggleModal,
	showModal,
}: UploadModalProps) {
	const handleClose = () => {
		toggleModal(false);
	};

	return (
		<Dialog
			sx={{
				'& .MuiDialog-paper': {
					width: 384,
					p: 15.5,
				},
			}}
			open={showModal}
			onClose={handleClose}>
			<DialogTitle sx={{ p: 0, mb: 9 }}>
				<Typography
					variant="body1"
					sx={{ fontSize: 13, fontWeight: 600, color: '#344054' }}>
					{title}
				</Typography>
				{!!description && (
					<Typography
						variant="body2"
						sx={{
							fontSize: 13,
							color: 'black',
							mt: 2.5,
							textAlign: 'justify',
						}}>
						{description}
					</Typography>
				)}
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<Box
					sx={{
						border: '1px dashed #D0D5DD',
						pt: 16,
						pb: 28,
						borderRadius: 2,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Box
						sx={{
							pt: 4,
							pb: 2,
							px: 4,
							borderRadius: 2,
							border: '1px solid #EAECF0',
							boxShadow: '0px 1px 2px 0px #1018280D',
						}}>
						<Image src={UploadIcon} alt="Upload icon" />
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							mt: 5,
							mb: 2.5,
						}}>
						<Button
							sx={{
								fontSize: 11,
								color: '#1570EF',
								p: 0,
								mr: 1.5,
							}}>
							Click to upload
						</Button>
						<Typography
							variant="body1"
							sx={{
								fontSize: 11,
								color: '#475467',
							}}>
							or drag and drop
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1" sx={{ fontSize: 11, color: '#475467' }}>
							(maximum size: {maxFileSize} MB)
						</Typography>
					</Box>
				</Box>
				<Box sx={{ mt: 2 }}>
					<Typography
						variant="body1"
						sx={{
							fontSize: 11,
							color: '#475467',
						}}>
						Supported formats: {fileFormats}
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions sx={{ p: 0, mt: 3 }}>
				{!!cancelButtonText && (
					<Button sx={{ color: '#667085' }}>{cancelButtonText}</Button>
				)}
				<Button
					variant="contained"
					sx={{
						py: 3,
						px: 14,
						border: '1px solid #175CD3',
					}}>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
