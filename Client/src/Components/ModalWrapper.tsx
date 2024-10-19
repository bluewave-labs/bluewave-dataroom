import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Typography,
} from '@mui/material';
import Image from 'next/image';

import UploadIcon from '../../public/assets/icons/uploadModel/upload-cloud-icon.svg';

// Refactoring note:
// We now use `ModalWrapper` to handle both upload and delete modals using a single component.
// This replaces the separate `UploadModal` and `DeleteConfirmationModal` and introduces a `variant` system
// for determining modal-specific behavior, such as the color of the confirm button or whether to show an upload box.

// Define the ModalVariant interface, which specifies what properties each modal variant has.
interface ModalVariant {
	color: 'primary' | 'error'; // Allows different button colors (primary for upload, error for delete)
	showUploadBox?: boolean; // If true, the modal shows an upload box (specific to upload variant)
}

// `modalVariants` maps each modal type (upload, delete) to its corresponding variant settings.
const modalVariants: { [key in 'upload' | 'delete']: ModalVariant } = {
	upload: {
		color: 'primary',
		showUploadBox: true,
	},
	delete: {
		color: 'error',
		showUploadBox: false,
	},
};

interface ModalWrapperProps {
	variant: 'upload' | 'delete'; // Determines if the modal is for uploading or deleting
	title: string; // Customizable title, this removes hardcoded values from individual modals
	description?: string; // Customizable description text
	confirmButtonText: string; // Text for the confirm button, changes depending on the action
	cancelButtonText?: string; // Optional, allows customization of the cancel button
	toggleModal: (show: boolean) => void; // Toggles the visibility of the modal
	showModal: boolean; // Controls if the modal is visible or not
	maxFileSize?: string; // Optional, used for upload-specific modals
	fileFormats?: string; // Optional, used for upload-specific modals
}

// ModalWrapper is now a reusable modal for both upload and delete actions.
export default function ModalWrapper({
	variant, // Determines whether it's an upload or delete modal
	title,
	description,
	confirmButtonText,
	cancelButtonText = 'Cancel', // Default text for the cancel button
	toggleModal,
	showModal,
	maxFileSize = '50', // Only relevant for upload modals
	fileFormats = 'PDF', // Only relevant for upload modals
}: ModalWrapperProps) {
	const handleClose = () => {
		toggleModal(false);
	};

	// Fetch settings based on the current variant (either upload or delete)
	const currentVariant = modalVariants[variant];

	return (
		<Dialog open={showModal} onClose={handleClose}>
			<DialogTitle variant="h2">
				{title} {/* Dynamic title, no longer hardcoded */}
			</DialogTitle>

			<DialogContent>
				{description && (
					<DialogContentText variant="subtitle2" mb={4}>
						{description} {/* Dynamic description */}
					</DialogContentText>
				)}
				{/* Upload-specific UI (e.g., upload box), shown for upload modals only */}
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
			</DialogContent>

			<DialogActions>
				{/* Cancel button is customizable */}
				<Button
					size="small"
					variant="text"
					color="secondary"
					onClick={handleClose}>
					{cancelButtonText}
				</Button>
				{/* Confirm button color is dynamic based on the variant */}
				<Button
					size="small"
					variant="contained"
					color={currentVariant.color} // Color is either primary or error based on variant
					onClick={handleClose} // You can replace this with actual action handling
				>
					{confirmButtonText} {/* Dynamic confirm button text */}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
