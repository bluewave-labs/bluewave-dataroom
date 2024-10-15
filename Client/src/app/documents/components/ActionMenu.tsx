import { Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import UploadModal from "@/Components/UploadModal";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const ActionMenu = ({ anchorEl, open, onClose }: Props) => {
  
  // State for multiple modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Modal handlers
  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Open delete confirmation modal
    onClose(); // Close the action menu
  };

  const handleUpdateClick = () => {
    setShowUploadModal(true); // Open update/upload modal
    onClose(); // Close the action menu
  };

  const handleDelete = () => {
    console.log("File Deleted");
    setShowDeleteModal(false); // Close delete modal after action
  };

  const closeModal = () => {
    setShowDeleteModal(false);
    setShowUploadModal(false);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        disableScrollLock={true}
        sx={{
          "& .MuiPaper-root": {
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            borderRadius: "4px",
          },
        }}
      >
        <MenuItem onClick={onClose}>Add new link</MenuItem>
        <MenuItem onClick={onClose}>Duplicate document</MenuItem>
        <MenuItem onClick={handleUpdateClick}>Update document</MenuItem>
        <MenuItem onClick={onClose}>View analytics</MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        title="Really delete this file?"
        description="When you delete this file, all the links associated with the file will also be removed. Note that this is a non-reversible action."
        confirmButtonText="Delete file"
        handleDelete={handleDelete}
        toggleModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />

      {/* Upload/Update Modal */}
      <UploadModal
        title="Update with a new document"
        description="When you update with a new document, the current link won’t change."
        maxFileSize="50"
        fileFormats="PDF"
        confirmButtonText="Update"
        toggleModal={setShowUploadModal}
        showModal={showUploadModal}
      />
    </>
  );
};

export default ActionMenu;
