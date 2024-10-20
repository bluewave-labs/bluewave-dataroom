import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	DialogContentText,
} from '@mui/material';

interface DeleteConfirmationModalProps {
	itemName: string;
	description: string;
	confirmButtonText: string;
	handleDelete: () => void;
	toggleModal: (show: boolean) => void;
	showDeleteModal: boolean;
}

export default function DeleteConfirmationModal({
	itemName,
	description,
	confirmButtonText,
	handleDelete,
	toggleModal,
	showDeleteModal,
}: DeleteConfirmationModalProps) {
	const handleClose = () => {
		toggleModal(false);
	};

	return (
		<Dialog
			sx={{ '& .MuiDialog-paper': { width: 439, p: 15 } }}
			open={showDeleteModal}
			onClose={handleClose}>
			<DialogTitle sx={{ fontSize: 13, color: '#344054', p: 0, mb: 5 }}>
				Really delete this {itemName}?
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<DialogContentText
					id="alert-dialog-slide-description"
					sx={{ fontSize: 13, color: '#344054', textAlign: 'justify' }}>
					{description}
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ p: 0, mt: 15 }}>
				<Button sx={{ color: '#344054', mr: 15 }} onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant="contained"
					sx={{ py: 3, px: 12, backgroundColor: '#DB504A' }}
					onClick={handleDelete}>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
