'use client';

import React from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { useToast } from '@/hooks/useToast';

import UserForm from './UserForm';

interface Params {
  linkId: string;
}

export default function FileAccessPage({ linkId }: Params) {
  const [linkData, setLinkData] = React.useState<{ [key: string]: any; }>({});
  const [error, setError] = React.useState('');
  const {showToast} = useToast();

  React.useEffect(() => {
    const fetchLinkDetails = async () => {
      try {
        const response = await axios.get(`/api/links?linkId=${linkId}`);
        setLinkData(response.data.data.link);
        // get the signedUrl and display it.
      } catch (error) {
        const err = error as any;
        const message = err?.response?.data?.error || 'An error occurred while fetching link details.'
        setError(message);
        showToast({
          message,
          variant: 'error',
        });
      }
    };

    fetchLinkDetails();
  }, [linkId]);

  console.log('linkData', linkData);

  if (linkData.password || linkData.requireUserDetailsOption) {
    return <UserForm
      passwordRequired={!!linkData.password}
      requireUserDetailsOption={linkData.requireUserDetailsOption}
    />;
  }

  if (error) {
    return (
      <Container>
        {error}
      </Container>
    );
  }

  return (
    <Container>
      <a href={linkData.signedUrl} target="_blank" rel="noreferrer">
        Download file
      </a>
    </Container>
  );

}
