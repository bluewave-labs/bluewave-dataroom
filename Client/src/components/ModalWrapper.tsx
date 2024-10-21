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
} from "@mui/material";
import Image from "next/image";

import UploadIcon from "../../public/assets/icons/uploadModel/upload-cloud-icon.svg";

interface ModalVariant {
  color: "primary" | "error";
  showUploadBox?: boolean;
}

const modalVariants: { [key in "upload" | "delete"]: ModalVariant } = {
  upload: {
    color: "primary",
    showUploadBox: true,
  },
  delete: {
    color: "error",
    showUploadBox: false,
  },
};

interface ModalWrapperProps {
  variant: "upload" | "delete";
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
  cancelButtonText = "Cancel",
  toggleModal,
  showModal,
  maxFileSize = "50",
  fileFormats = "PDF",
}: ModalWrapperProps) {
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
              border="1px dashed #D0D5DD"
            >
              <Box
                px={5}
                pt={6}
                pb={3}
                m={6}
                borderRadius={2}
                border="1px solid #EAECF0"
              >
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
        <Button
          size="small"
          variant="text"
          color="secondary"
          onClick={handleClose}
        >
          {cancelButtonText}
        </Button>

        <Button
          size="small"
          variant="contained"
          color={currentVariant.color}
          onClick={handleClose}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
