import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

import UploadIcon from '../../public/assets/icons/uploadModel/upload-cloud-icon.svg';
import { useState } from 'react';

interface ModalVariant {
	color: 'primary' | 'error';
	showUploadBox?: boolean;
	showInviteBox?: boolean;
}

const modalVariants: { [key in 'upload' | 'delete' | 'invite']: ModalVariant } =
	{
		upload: {
			color: 'primary',
			showUploadBox: true,
			showInviteBox: false,
		},
		delete: {
			color: 'error',
			showUploadBox: false,
			showInviteBox: false,
		},
		invite: {
			color: 'primary',
			showUploadBox: false,
			showInviteBox: true,
		},
	};

interface ModalWrapperProps {
	variant: 'upload' | 'delete' | 'invite';
	title: string;
	description?: string;
	confirmButtonText: string;
	cancelButtonText?: string;
	toggleModal: (show: boolean) => void;
	showModal: boolean;
	maxFileSize?: string;
	fileFormats?: string;
}

export default function ModalWrapper({
	variant,
	title,
	description,
	confirmButtonText,
	cancelButtonText = 'Cancel',
	toggleModal,
	showModal,
	maxFileSize = '50',
	fileFormats = 'PDF',
}: ModalWrapperProps) {
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const handleClose = () => {
		toggleModal(false);
	};

	const currentVariant = modalVariants[variant];

	return (
		<Dialog open={showModal} onClose={handleClose}>
			<DialogTitle variant="h2">{title}</DialogTitle>

			<DialogContent>
				{description && (
					<DialogContentText variant="subtitle2" mb={4}>
						{description}
					</DialogContentText>
				)}

				{currentVariant.showUploadBox && (
					<>
						<Box
							mt={8}
							pt={16}
							pb={28}
							borderRadius={2}
							display="flex"
							flexDirection="column"
							alignItems="center"
							border="1px dashed #D0D5DD">
							<Box
								px={5}
								pt={6}
								pb={3}
								m={6}
								borderRadius={2}
								border="1px solid #EAECF0">
								<Image src={UploadIcon} alt="Upload icon" />
							</Box>
							<Box display="flex" alignItems="center">
								<Link href="#" underline="hover">
									<Typography variant="subtitle2" color="text.brand">
										Click to upload
									</Typography>
								</Link>
								<Typography variant="subtitle2" sx={{ ml: 2 }}>
									or drag and drop
								</Typography>
							</Box>
							<Box>
								<Typography variant="subtitle2">
									(maximum size: {maxFileSize} MB)
								</Typography>
							</Box>
						</Box>
						<Box mt={2}>
							<Typography variant="subtitle1">
								Supported formats: {fileFormats}
							</Typography>
						</Box>
					</>
				)}
				{currentVariant.showInviteBox && (
					<Box component="form" autoComplete="off" mt={13}>
						<Grid>
							<TextField
								variant="outlined"
								label="Email"
								size="small"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								fullWidth
								sx={{
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderRadius: 2.5,
										},
									},
								}}
							/>
						</Grid>
						<Grid mt={15}>
							<TextField
								variant="outlined"
								label="Select role"
								size="small"
								select
								value={role}
								onChange={(e) => setRole(e.target.value)}
								fullWidth
								sx={{
									'& .MuiInputBase-input': { p: '0.56rem !important' },
									'& .MuiOutlinedInput-root': {
										'& fieldset': {
											borderRadius: 2.5,
										},
									},
								}}></TextField>
						</Grid>
					</Box>
				)}
			</DialogContent>

			<DialogActions sx={{ pr: 12, pb: 12 }}>
				<Button
					size="small"
					variant="text"
					color="secondary"
					onClick={handleClose}>
					{cancelButtonText}
				</Button>

				<Button
					size="small"
					variant="contained"
					color={currentVariant.color}
					onClick={handleClose}>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
