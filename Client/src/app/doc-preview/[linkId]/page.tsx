'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

//TODO: Implement the DocumentPreview component according to the design and requirements.
const DocumentPreview = ({ params }) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { linkId } = params;

  useEffect(() => {
    if (linkId) {
      const fetchSignedUrl = async () => {
        try {
          const response = await axios.get(`/api/links?linkId=${linkId}`);

          setSignedUrl(response.data.data.signedUrl);
        } catch (err) {
          setError('Failed to load document. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchSignedUrl();
    }

  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }


  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      {signedUrl ? (
        <iframe src={signedUrl} width="100%" height="600px" />
      ) : (
        <Typography>File Preview: No document found.</Typography>
      )}
    </Box>
  );
};

export default DocumentPreview;
