import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

interface DeleteConfirmationModalProps {
  itemToDelete: string;
  paragraphText: string;
  buttonText: string;
  handleDelete: () => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean;
}

export default function DeleteConfirmationModal({
  itemToDelete,
  paragraphText,
  buttonText,
  handleDelete,
  setShowDeleteModal,
  showDeleteModal,
}: DeleteConfirmationModalProps) {
  //close the DeleteConfirmationModal component
  const handleClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            // Modify the style of the internal div
            width: 439,
            p: 15,
          },
        }}
        open={showDeleteModal}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            fontSize: "13px",
            color: "#344054",
            p: 0,
            mb: 5,
          }}
        >
          Really delete this {itemToDelete}?
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{
              fontSize: "13px",
              color: "#344054",
              textAlign: "justify",
            }}
          >
            {paragraphText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 15 }}>
          <Button
            sx={{
              color: "#344054",
              mr: 15,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              py: 3,
              px: 12,
              backgroundColor: "#DB504A",
            }}
            onClick={handleDelete}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
