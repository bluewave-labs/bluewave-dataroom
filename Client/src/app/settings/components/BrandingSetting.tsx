"use client";

import { Avatar, Box, Button, Typography } from "@mui/material";
import ColorPickerBox from "./ColorPickerBox";
import { useState } from "react";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import UploadModal from "@/Components/UploadModal";

export default function BrandingSetting() {
  // State for multiple modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Modal handlers
  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Open delete confirmation modal
  };

  const handleUpdateClick = () => {
    setShowUploadModal(true); // Open update/upload modal
  };

  const handleDelete = () => {
    console.log("Logo Deleted");
    setShowDeleteModal(false); // Close delete modal after action
  };

  const handleSave = () => {
    console.log("Update successful!"); //Save the changes on the settings page
  };

  return (
    <>
      <Box>
        <Box mb={16}>
          <Typography>
            Customize how your brand appears to the public across DataRoom
            documents your visitors see.
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="h1" mr={220}>
            Logo
          </Typography>
          <Avatar
            sx={{
              width: 86,
              height: 86,
              backgroundColor: "#EDEEF1",
              color: "#1570EF",
              fontSize: 40,
              fontWeight: 600,
            }}
            onClick={handleUpdateClick}
          >
            BU
          </Avatar>
          <Box ml={4} mt={10}>
            <Button color="inherit" size="large" onClick={handleDeleteClick}>
              Delete
            </Button>
            <Button size="large" onClick={handleUpdateClick}>
              Update
            </Button>
          </Box>
        </Box>
        <Box display="flex" mt={20}>
          <Typography variant="h1" mr={175}>
            Background color
          </Typography>
          <ColorPickerBox />
        </Box>
        <Box display="flex" mt={14}>
          <Typography variant="h1" mr={202}>
            Font color
          </Typography>
          <ColorPickerBox />
        </Box>
        <Box ml={375} mt={70}>
          <Button variant="contained" sx={{ px: 25 }} onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        title="Really delete this logo?"
        description="When you delete this logo, all the links associated with the logo will also be removed. Note that this is a non-reversible action."
        confirmButtonText="Delete logo"
        handleDelete={handleDelete}
        toggleModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />

      {/* Upload/Update Modal */}
      <UploadModal
        title="Update with a new logo"
        maxFileSize="3"
        fileFormats="JPG, PNG"
        confirmButtonText="Update"
        toggleModal={setShowUploadModal}
        showModal={showUploadModal}
      />
    </>
  );
}
