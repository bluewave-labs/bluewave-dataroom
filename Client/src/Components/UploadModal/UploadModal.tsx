import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import UploadIcon from "../../App/Assets/Icons/UploadModal/upload-cloud-02.svg";

interface UploadModalProps {
  titleText: string;
  paragraphText: string;
  maxSize: string;
  supportedFormats: string;
  buttonText: string;
  removeButtonText: string;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUploadModal: boolean;
}

export default function UploadModal({
  titleText,
  paragraphText,
  maxSize,
  supportedFormats,
  buttonText,
  removeButtonText,
  setShowUploadModal,
  showUploadModal,
}: UploadModalProps) {
  const handleClose = () => {
    setShowUploadModal(false);
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            // Modify the style of the internal div
            width: 384,
            p: 15.5,
          },
        }}
        open={showUploadModal}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle sx={{ p: 0, mb: 9 }}>
          <Typography
            variant="body1"
            sx={{ fontSize: 13, fontWeight: 600, color: "#344054" }}
          >
            {titleText}
          </Typography>
          {!!paragraphText && (
            <Typography
              variant="body2"
              sx={{
                fontSize: 13,
                color: "black",
                mt: 2.5,
                textAlign: "justify",
              }}
            >
              {paragraphText}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              border: "1px dashed #D0D5DD",
              pt: 16,
              pb: 28,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                pt: 4,
                pb: 2,
                px: 4,
                borderRadius: 2,
                border: "1px solid #EAECF0",
                boxShadow: "0px 1px 2px 0px #1018280D",
              }}
            >
              <Image src={UploadIcon} alt="Upload icon" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 5,
                mb: 2.5,
              }}
            >
              <Button
                sx={{
                  fontSize: 11,
                  color: "#1570EF",
                  p: 0,
                  mr: 1.5,
                }}
              >
                Click to upload
              </Button>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 11,
                  color: "#475467",
                }}
              >
                or drag and drop
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: 11, color: "#475467" }}
              >
                (maximum size: {maxSize} MB)
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: 11,
                color: "#475467",
              }}
            >
              Supported formats: {supportedFormats}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3 }}>
          {!!removeButtonText && (
            <Button sx={{ color: "#667085" }}>{removeButtonText}</Button>
          )}
          <Button
            variant="contained"
            sx={{
              py: 3,
              px: 14,
              border: "1px solid #175CD3",
            }}
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
