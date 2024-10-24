"use client";

import { Avatar, Box, Button, Typography, Link } from "@mui/material";
import ColorPickerBox from "./ColorPickerBox";
import { useState } from "react";
import ModalWrapper from "@/Components/ModalWrapper";

export default function BrandingSetting() {
  const [modalState, setModalState] = useState<"delete" | "upload" | null>(
    null
  );

  const openModal = (type: "delete" | "upload") => {
    setModalState(type);
  };

  const closeModal = () => setModalState(null);

  const handleDelete = () => {
    console.log("Logo Deleted");
  };

  const handleSave = () => {
    console.log("Update successful!");
  };

  return (
    <>
      <Box>
        <Box mb={16}>
          <Typography variant="subtitle2">
            Customize how your brand appears to the public across DataRoom
            documents your visitors see.
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="h3" mr={174}>
            Logo
          </Typography>
          <Avatar
            sx={{
              width: 86,
              height: 86,
              backgroundColor: "#EDEEF1",
              color: "text.brand",
              fontSize: 47,
              fontWeight: 600,
            }}
            onClick={() => openModal("upload")}
          >
            BU
          </Avatar>
          <Box ml={4} mt={15}>
            <Link
              variant="subtitle1"
              color="inherit"
              href="#"
              underline="hover"
              px={4}
              onClick={() => openModal("delete")}
            >
              Delete
            </Link>
            <Link
              variant="subtitle1"
              href="#"
              underline="hover"
              px={4}
              onClick={() => openModal("upload")}
            >
              Update
            </Link>
          </Box>
        </Box>
        <Box display="flex" mt={20}>
          <Typography variant="h3" mr={138}>
            Background color
          </Typography>
          <ColorPickerBox />
        </Box>
        <Box display="flex" mt={14}>
          <Typography variant="h3" mr={160}>
            Font color
          </Typography>
          <ColorPickerBox />
        </Box>
        <Box ml={330} mt={70}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>

      <ModalWrapper
        variant="delete"
        title="Really delete this logo?"
        description="When you delete this logo, all the links associated with the logo will also be removed. This action is non-reversible."
        confirmButtonText="Delete logo"
        toggleModal={() => closeModal()}
        showModal={modalState === "delete"}
      />

      <ModalWrapper
        variant="upload"
        title="Upload logo"
        confirmButtonText="Update"
        toggleModal={() => closeModal()}
        showModal={modalState === "upload"}
        maxFileSize="3"
        fileFormats="JPG, PNG"
      />
    </>
  );
}
