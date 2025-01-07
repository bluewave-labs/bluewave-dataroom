'use client';

import React from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/useToast';
import { Container, Box, CircularProgress, Typography } from '@mui/material';

import FilePage from './File';
import UserForm from './UserForm';

interface Params {
  linkId: string;
}

export default function FileAccessPage({ linkId }: Params) {
  const [linkData, setLinkData] = React.useState<{ [key: string]: any; }>({});
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const { showToast } = useToast();
  const [signedUrl, setSignedUrl] = React.useState('');

  const handleSignedUrlFetched = (url: string) => {
    setSignedUrl(url);
  };

  React.useEffect(() => {
    const fetchLinkDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/links?linkId=${linkId}`);
        if (response.data.data.signedUrl) {
          setSignedUrl(response.data.data.signedUrl);
        } else {
          setLinkData(response.data.data);
        }
      } catch (error) {
        const err = error as any;
        const message = err?.response?.data?.message || err?.response?.data?.error || 'An error occurred while fetching link details.';
        setError(message);
        // showToast({
        //   message,
        //   variant: 'error',
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [linkId]);


  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='50vh'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h1" color="error" sx={{ mt: 40 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (signedUrl) {
    return (
      <Container>
        <FilePage signedUrl={signedUrl} />
      </Container>
    );
  }

  return (
    <Container>
      <UserForm
        linkId={linkId}
        onSignedUrlFetched={handleSignedUrlFetched}
        passwordRequired={linkData.isPasswordProtected}
        userDetailsOption={linkData.requiredUserDetailsOption}
      />
    </Container>
  );
}
