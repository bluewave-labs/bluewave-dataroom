import { Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import ModalWrapper from "@/Components/ModalWrapper";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const ActionMenu = ({ anchorEl, open, onClose }: Props) => {
  const [modalState, setModalState] = useState<"delete" | "upload" | null>(null);

  const openModal = (type: "delete" | "upload") => {
    setModalState(type);
    onClose();
  };

  const closeModal = () => setModalState(null);

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
        <MenuItem onClick={() => openModal("upload")}>Update document</MenuItem>
        <MenuItem onClick={onClose}>View analytics</MenuItem>
        <MenuItem onClick={() => openModal("delete")}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>

      <ModalWrapper
        variant="delete"
        title="Really delete this file?"
        description="When you delete this file, all the links associated with the file will also be removed. This action is non-reversible."
        confirmButtonText="Delete file"
        toggleModal={() => closeModal()}
        showModal={modalState === "delete"}
      />

      <ModalWrapper
        variant="upload"
        title="Update with a new document"
        description="When you update with a new document, the current link won’t change."
        confirmButtonText="Update"
        toggleModal={() => closeModal()} 
        showModal={modalState === "upload"}
      />
    </>
  );
};

export default ActionMenu;
