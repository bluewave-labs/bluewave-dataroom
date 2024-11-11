import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { FC, useState } from 'react';
import UploadIcon from '../../public/assets/icons/uploadModel/upload-cloud-icon.svg';
import Dropdown from './Dropdown';
import NavLink from './NavLink';

interface ModalVariant {
	color: 'primary' | 'error';
	ContentComponent: FC<{ maxFileSize?: string; fileFormats?: string }>;
}

const modalVariants: { [key in 'upload' | 'delete' | 'invite']: ModalVariant } = {
	upload: {
		color: 'primary',
		ContentComponent: UploadBox,
	},
	delete: {
		color: 'error',
		ContentComponent: () => null,
	},
	invite: {
		color: 'primary',
		ContentComponent: InviteBox,
	},
};

interface ModalWrapperProps {
	variant: 'upload' | 'delete' | 'invite';
	title: string;
	description?: string;
	confirmButtonText: string;
	cancelButtonText?: string;
	open: boolean;
	toggleModal: () => void;
	onClose: () => void;
	maxFileSize?: string;
	fileFormats?: string;
}

export default function ModalWrapper({
	variant,
	title,
	description,
	confirmButtonText,
	cancelButtonText = 'Cancel',
	open,
	onClose,
	toggleModal,
	maxFileSize = '50',
	fileFormats = 'PDF',
}: ModalWrapperProps) {
	const { color, ContentComponent } = modalVariants[variant];

	const handleConfirm = () => {
		toggleModal(), onClose();
	};

	return (
		<Dialog open={open}>
			<DialogTitle variant="h2">{title}</DialogTitle>
			<DialogContent>
				{description && (
					<DialogContentText variant="subtitle2" mb={4}>
						{description}
					</DialogContentText>
				)}
				<ContentComponent maxFileSize={maxFileSize} fileFormats={fileFormats} />
			</DialogContent>
			<DialogActions>
				<Button variant="text" color="secondary" onClick={toggleModal}>
					{cancelButtonText}
				</Button>
				<Button variant="contained" color={color} onClick={handleConfirm}>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

// Separate component for the Upload Box
function UploadBox({ maxFileSize, fileFormats }: { maxFileSize?: string; fileFormats?: string }) {
	return (
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
				<Box px={5} pt={6} pb={3} m={6} borderRadius={2} border="1px solid #EAECF0">
					<Image src={UploadIcon} alt="Upload icon" />
				</Box>
				<Box display="flex" alignItems="center">
					<NavLink href="#" linkText={'Click to upload'} />
					<Typography variant="subtitle2" sx={{ ml: 2 }}>
						or drag and drop
					</Typography>
				</Box>
				<Box>
					<Typography variant="subtitle2">(maximum size: {maxFileSize} MB)</Typography>
				</Box>
			</Box>
			<Box mt={2}>
				<Typography variant="subtitle1">Supported formats: {fileFormats}</Typography>
			</Box>
		</>
	);
}

// Separate component for the Invite Box
function InviteBox() {
	const [email, setEmail] = useState('');

	return (
		<Box component="form" autoComplete="off" mt={13}>
			<Grid>
				<TextField
					variant="outlined"
					placeholder="Email"
					size="small"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					sx={{
						'& .MuiInputBase-input::placeholder': { color: '#667085', opacity: 1 },
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderRadius: 2,
							},
						},
					}}
				/>
			</Grid>
			<Grid mt={15}>
				<Dropdown
					initialValue="Select role"
					variant="outlined"
					isSelectFullWidth={true}
					selectPadding="0.5rem 1rem"
					options={[
						{ value: 'Select role', label: 'Select role' },
						{ value: 'Administrator', label: 'Administrator' },
						{ value: 'Member', label: 'Member' },
					]}
					onValueChange={(newRole) => {
						console.log(`${newRole} is selected`);
					}}
				/>
			</Grid>
		</Box>
	);
}
