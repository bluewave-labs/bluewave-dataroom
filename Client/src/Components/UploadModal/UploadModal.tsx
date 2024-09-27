"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../app/Assets/Icons/UploadModal/upload-cloud-02.svg";

type UploadModalProps = {
  itemToUpload: string;
  setShowUploadModal: any;
};

const UploadModal: FC<UploadModalProps> = ({
  itemToUpload,
  setShowUploadModal,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Add the dropped files to the state
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50000000, // Limit file size to 50MB
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  //close the UploadModal component
  useEffect(() => {
    const handleClickOnBody = (event: MouseEvent) => {
      //check whether the click happened inside an element with the uploadModal id or not
      if (!(event.target as HTMLElement).closest("#uploadModal")) {
        setShowUploadModal(false);
      }
    };

    document.body.addEventListener("click", handleClickOnBody);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOnBody);
    };
  }, []);

  return (
    <>
      <Box
        id="uploadModal"
        sx={{
          width: "384px",
          height: "338px",
          p: "32px",
          boxShadow: "0px 20px 24px -4px #10182814",
          borderRadius: "4px",
          border: "1px solid #e5e5e540",
          zIndex: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: 600, fontSize: "13px", color: "#344054" }}
          >
            Upload a new {` ${itemToUpload}`}
          </Typography>
        </Box>
        <Box
          {...getRootProps()}
          sx={{
            border: "1px dashed #D0D5DD",
            mt: "16px",
            width: "320px",
            height: "190px",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography
              variant="body1"
              sx={{
                fontSize: "11px",
                color: "#475467",
              }}
            >
              Drop the {` ${itemToUpload} `} here ...
            </Typography>
          ) : (
            <>
              {files.length > 0 ? (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "11px",
                      color: "#475467",
                    }}
                  >
                    Uploaded {` ${itemToUpload}`}:
                  </Typography>
                  {files.map((file, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        fontSize: "11px",
                        color: "#475467",
                      }}
                    >
                      {file.name}
                    </Typography>
                  ))}
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      padding: "10px 0px 0px 0px",
                      borderRadius: "4px",
                      border: "1px solid #EAECF0",
                      boxShadow: "0px 1px 2px 0px #1018280D",
                      textAlign: "center",
                    }}
                  >
                    <Image
                      src={UploadIcon}
                      alt="Upload icon"
                      style={{
                        color: "#344054",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      minWidth: "271px",
                      minHeight: "18px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      m: "10px 0px 5px 0px",
                    }}
                  >
                    <Button
                      sx={{
                        fontSize: "11px",
                        textTransform: "none",
                        color: "#1570EF",
                        p: "0px",
                        mr: "3px",
                        "&:hover": {
                          color: "#0963ca",
                        },
                      }}
                    >
                      Click to upload
                    </Button>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "11px",
                        color: "#475467",
                      }}
                    >
                      or drag and drop
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      minWidth: "271px",
                      minHeight: "18px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "11px", color: "#475467" }}
                    >
                      (maximum size: 50 MB)
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
        <Box sx={{ mt: "3px" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "11px",
              fontWeight: 400,
              lineHeight: "18px",
              color: "#475467",
            }}
          >
            Supported formats: PDF
          </Typography>
        </Box>
        <Box sx={{ float: "right" }}>
          <Button
            {...getRootProps()}
            variant="contained"
            sx={{
              width: "100px",
              height: "34px",
              border: "1px solid #175CD3",
              borderRadius: "4px",
              backgroundColor: "#1570EF",
              p: "10px, 16px, 10px, 16px",
              color: "white",
              textTransform: "none",
              boxShadow: "0px 1px 2px 0px #1018280D",
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UploadModal;
