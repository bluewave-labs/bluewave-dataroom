import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

type DeleteConfirmationModalProps = {
  itemToDelete: string;
  handleDelete: any;
  setShowDeleteModal: any;
};

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  itemToDelete,
  handleDelete,
  setShowDeleteModal,
}) => {
  //close the DeleteConfirmationModal component
  const handleCancle = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 20px 24px -4px #10182814",
          border: "1px solid #e5e5e540",
          width: "439px",
          height: "186",
          borderRadius: "4px",
          p: "32px",
          zIndex: 1,
        }}
      >
        <Stack direction={"column"} spacing={"30px"}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#344054",
                mb: "10px",
              }}
            >
              Really delete this {itemToDelete}?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "13px",
                lineHeight: "20px",
                color: "#344054",
                textAlign: "justify",
              }}
            >
              When you delete this {itemToDelete}, all the links associated with
              the {`${itemToDelete} `} will also be removed. Note that this is a
              non-reversible action.
            </Typography>
          </Box>
          <Box sx={{ direction: "rtl" }}>
            <Button
              variant="contained"
              sx={{
                width: "119px",
                height: "34px",
                padding: "8px 12px 8px 12px",
                borderRadius: "4px",
                backgroundColor: "#DB504A",
                ml: "32px",
                fontSize: "13px",
                textTransform: "none",
              }}
              onClick={handleDelete}
            >
              Delete {itemToDelete}
            </Button>
            <Button
              sx={{
                width: "43px",
                height: "24px",
                fontSize: "13px",
                color: "#344054",
                display: "inline-flex",
                textTransform: "none",
              }}
              onClick={handleCancle}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default DeleteConfirmationModal;
