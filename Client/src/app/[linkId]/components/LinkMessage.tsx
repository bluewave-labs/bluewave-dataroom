import React from 'react';
import { Box, Typography, Link, SvgIcon } from '@mui/material';
import Image from 'next/image';
import LinkIcon from '../../../../public/assets/icons/documentPage/LinkIcon';

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
        <Typography variant="h6" sx={{ color: '#FF4747', fontWeight: 600, fontSize: 24, mb: 1 }}>
          Link Expired
        </Typography>
        <Typography sx={{ color: '#000000', fontWeight: 400, fontSize: 13, mb: 2 }}>
          The link you used is no longer active. If you believe this is an error, please contact the
          document owner.
        </Typography>
      </Box>
    </Box>
  );
};

export default LinkMessage;
