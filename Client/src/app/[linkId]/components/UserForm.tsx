'use client';

import React from 'react';
import axios from 'axios';
import CustomTextField from '@/components/CustomTextField';

import { Alert, Divider, Box, Button, TextField, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

interface UserFormProps {
  linkId: string;
  passwordRequired: boolean;
  userDetailsOption: number;
  onSignedUrlFetched: (url: string) => void;
}

//TODO: Enhance code, lift state and input handlers to parent component.
export default function UserForm(props: UserFormProps) {
  const [formDetails, setFormDetails] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    //TODO: handle form validation in better approach.
    if (!formDetails.firstName || !formDetails.lastName) {
      return setError('Please fill in all fields.');
    }

    if (props.passwordRequired && !formDetails.password) {
      return setError('Please fill in the password field.');
    }

    if (props.userDetailsOption === 2 && !formDetails.email) {
      return setError('Please fill in the email field.');
    }

    try {
      const response = await axios.post('/api/links/shared_access', { ...formDetails, linkId: props.linkId });

      props.onSignedUrlFetched(response.data.data.signedUrl);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          setError('Error: No response from server. Please try again later.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } else if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={() => { }}
        PaperProps={{
          component: 'form',
          onSubmit: handleFormSubmit,
          sx: { minWidth: 500, minHeight: 450, padding: '32px' },
        }}
      >
        <DialogTitle sx={{
          padding: '0 0 20px 0'
        }} variant='h1'>Enter Your Details</DialogTitle>
        <DialogContent sx={{
          padding: 0
        }}>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
            {error && <Alert sx={{
              mb: 10,
              fontSize: '0.8rem',
            }} severity="error">{error}</Alert>}

            <Typography variant="body1" mr={4}>First Name</Typography>

            <CustomTextField
              placeholder='Enter First Name'
              name="firstName"
              value={formDetails.firstName}
              onChange={handleInputChange}
              minWidth={200}
            />
            <Typography variant="body1" mr={4}>Last Name</Typography>

            <CustomTextField
              placeholder='Enter Last Name'
              name="lastName"
              value={formDetails.lastName}
              onChange={handleInputChange}
              minWidth={200}
            />
            {props.userDetailsOption === 2 && (
              <>
                <Typography variant="body1" mr={4}>Email</Typography>
                <CustomTextField
                  placeholder='Enter Email'
                  name="email"
                  value={formDetails.email}
                  onChange={handleInputChange}
                  minWidth={200}
                /></>
            )}
            {props.passwordRequired && (
              <>
                <Typography variant="body1" mr={4}>Password</Typography>
                <CustomTextField
                  placeholder='Enter Password'
                  name="password"
                  value={formDetails.password}
                  onChange={handleInputChange}
                  type="password"
                  minWidth={200}
                />
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: 0 }}>
          <Button
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
