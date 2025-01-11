import React from 'react';
import { Box, Typography } from '@mui/material';

import LinkIcon from '../../../../../public/assets/icons/link/LinkIcon';

interface LinkMessageProps {
  message: string;
  description?: string;
}

const LinkMessage: React.FC<LinkMessageProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
          gap: 2
        }}>
          <Typography variant="h1" color='text.error'>
           {props.message}
          </Typography>
          <LinkIcon />
        </Box>
        <Typography>
          The link you used is no longer active. If you believe this is an error, please contact the
          document owner.
        </Typography>
      </Box>
    </Box>
  );
};

export default LinkMessage;
