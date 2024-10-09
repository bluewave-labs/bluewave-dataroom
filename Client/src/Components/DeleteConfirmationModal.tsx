import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

interface DeleteConfirmationModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  handleDelete: () => void;
  toggleModal: (show: boolean) => void;
  showDeleteModal: boolean;
}

export default function DeleteConfirmationModal({
  title,
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
      sx={{ "& .MuiDialog-paper": { width: 439, p: 4 } }}
      open={showDeleteModal}
      onClose={handleClose}
    >
      <DialogTitle variant="h2" fontSize={13}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="body2" color="inherit" fontSize={13}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 8, px: 12 }}>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
