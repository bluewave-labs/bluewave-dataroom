import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Image from "next/image";

import UploadIcon from "../../public/assets/icons/uploadModel/upload-cloud-icon.svg";

interface UploadModalProps {
  title: string;
  description?: string;
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
        "& .MuiDialog-paper": {
          width: 384,
          p: 4,
        },
      }}
      open={showModal}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          "& .MuiTypography-root": {
            fontSize: 13,
          },
        }}
      >
        <Typography variant="h2">{title}</Typography>
        {!!description && (
          <Typography variant="body2" color="inherit" mt={2.5}>
            {description}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Box
          pt={16}
          pb={28}
          borderRadius={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          border="1px dashed #D0D5DD"
        >
          <Box pt={4} pb={2} px={4} borderRadius={2} border="1px solid #EAECF0">
            <Image src={UploadIcon} alt="Upload icon" />
          </Box>
          <Box display="flex" alignItems="center">
            <Button size="small">Click to upload</Button>
            <Typography variant="body2" color="inherit">
              or drag and drop
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="inherit">
              (maximum size: {maxFileSize} MB)
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="inherit">
            Supported formats: {fileFormats}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pt: 0, pb: 8, px: 12 }}>
        {!!cancelButtonText && (
          <Button color="inherit">{cancelButtonText}</Button>
        )}
        <Button variant="contained">{confirmButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
}
