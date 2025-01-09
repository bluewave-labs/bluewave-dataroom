import React from 'react';
import { Typography, Box, Button, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatBytes } from '@/utils/shared/utils';
import { useToast } from '@/hooks/useToast';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('../../../utils/shared/PdfViewer'), { ssr: false });

const ActionButton = styled(Button)({
  width: '250px',
  fontWeight: 600
});

interface FilePageProps {
  signedUrl: string;
  fileName: string;
  size: number;
}

const FileAccess: React.FC<FilePageProps> = ({ signedUrl, fileName, size }) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(signedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url);
      showToast({ message: 'File downloaded successfully', variant: 'success' });
    } catch (error) {
      console.error('Error downloading the file:', error);
      showToast({
        message: 'Error downloading the file. Please try again.',
        variant: 'error'
      });
    }
  };

  return (
    <Box sx={{
      textAlign: 'center',
    }}>
      <Typography variant="h1" color='text.secondary'>
        File is ready for download
      </Typography>
      <Typography variant='subtitle2'>
        Thanks for verifying your details. You can now download the document.
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0',
        gap: 2
      }}>
        <Typography variant='subtitle2'>
          Document:
        </Typography>
        <Typography variant='subtitle2' color='primary' >
          {fileName} ({formatBytes(size)})
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 40
      }}>
        <ActionButton variant='contained' onClick={() => setIsModalOpen(true)}>View File</ActionButton>
        <ActionButton variant='contained' onClick={handleDownload}>Download File</ActionButton>
      </Box>
      {/* <PdfViewer pdfUrl={signedUrl} /> */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal on backdrop click or ESC
        aria-labelledby="view-pdf-modal"
        aria-describedby="view-pdf-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            width: '80%',
            height: '80%',
            backgroundColor: 'white',
            boxShadow: 24,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            }}
          >
            Close
          </Button>
          <PdfViewer pdfUrl={signedUrl} />
        </Box>
      </Modal>
    </Box>

  );
};

export default FileAccess;
