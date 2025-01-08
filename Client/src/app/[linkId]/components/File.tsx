import React from 'react';
import dynamic from 'next/dynamic';
import { Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const PdfViewer = dynamic(() => import('../../../utils/shared/PdfViewer'), { ssr: false });

const ActionButton = styled(Button)({
  width: '250px',
})

interface FilePageProps {
  signedUrl: string;
}

const FilePage: React.FC<FilePageProps> = ({ signedUrl }) => {
  return (
    <Box sx={{
      // bgcolor: '#F9F9F9',
      textAlign: 'center',
    }}>
      <Typography variant="h6" sx={{ color: '#000000', fontWeight: 600, fontSize: 24, mb: 2 }}>
        File is ready for download
      </Typography>

      <Typography sx={{ color: '#000000', fontWeight: 400, fontSize: 13, mb: 2 }}>
        Thanks for verifying your details. You can now download the document.

      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0',
        gap: 2
      }}>
        <Typography sx={{ color: '#000000', fontWeight: 400, fontSize: 13, mb: 2 }}>
          Document:
        </Typography>
        <Typography sx={{ color: 'primary', fontWeight: 400, fontSize: 13, mb: 2 }}>
          File_name.pdf (1.2mb)
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 40
      }}>
        <ActionButton variant='contained'>View File</ActionButton>
        <ActionButton variant='contained'>Download File</ActionButton>
      </Box>
      {/* <PdfViewer pdfUrl={signedUrl} /> */}
    </Box>

  );
};

export default FilePage;
