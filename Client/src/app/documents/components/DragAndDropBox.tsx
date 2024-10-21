"use client";

import ModalWrapper from '@/components/ModalWrapper';
import { Box, Button } from "@mui/material";
import { useState } from "react";
interface DragAndDropBoxProps {
  text: string;
  height?: string;
}

const DragAndDropBox = ({ text, height }: DragAndDropBoxProps) => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpdateClick = () => {
    setShowUploadModal(true);
  };

  const handleInput = (e: any) => {
    // Handle file upload logic here
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed rgba(236, 236, 236)",
        borderRadius: "4px",
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        height: {height},
      }}
    >
      <Box
        component="img"
        src="/assets/icons/documentPage/document-upload-icon.svg"
        alt="Document Icon"
        sx={{ width: "8rem", height: "8rem", marginBottom: "1rem" }}
      />
      <Button color="inherit" onClick={handleUpdateClick}>
        {text}
      </Button>

      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleInput}
      />

      <ModalWrapper
        variant="upload"
        title="Upload a new file"
        confirmButtonText="Upload"
        toggleModal={setShowUploadModal}
        showModal={showUploadModal}
        maxFileSize="50"
        fileFormats="PDF"
      />
    </Box>
  );
};

export default DragAndDropBox;
