import PageLoader from '../loading';
import FormInput from '@/components/FormInput';
import LoadingButton from '@/components/LoadingButton';
import ModalWrapper from '@/components/ModalWrapper';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { requiredFieldRule } from '@/utils/shared/validators';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Divider, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ProfileForm() {
	const [fetchLoading, setFetchLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const deleteAccountModal = useModal();
	const deletePhotoModal = useModal();
	const uploadModal = useModal();

	const { showToast } = useToast();
	const { data: session } = useSession();

	const { values, setValues, handleChange, getError, validateAll } = useValidatedFormData({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			// image: '',
		},
		validationRules: {
			firstName: [requiredFieldRule('First name is required')],
			lastName: [requiredFieldRule('Last name is required')],
		},
	});

	// Fetch data
	useEffect(() => {
		const fetchProfileData = async () => {
			setFetchLoading(true);
			try {
				const response = await axios.get('/api/profile');
				setValues(response.data);
			} catch (error) {
				console.error('Error loading profile data:', error);
				setError('Failed to load profile data! Please try again later.');
			} finally {
				setFetchLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	// Submit data
	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// Basic client checks
			const hasError = validateAll();
			if (hasError) {
				toast.showToast({
					message: 'Please correct the highlighted fields.',
					variant: 'warning',
				});
			}

			if (values.firstName && values.lastName) {
				try {
					// Make the POST request
					const response = await axios.post('/api/profile/changeName', {
						email: session?.user.email,
						firstName: values.firstName,
						lastName: values.lastName,
						// image: values.image,
					});
					// Handle success
					if (response.status === 200) {
						toast.showToast({
							message: 'Profile Updated Successfully!',
							variant: 'success',
						});
					}
				} catch (error: unknown) {
					// Narrowing down the type of `error`
					if (axios.isAxiosError(error)) {
						// Axios-specific error handling
						if (error.response) {
							// Server responded with an error
							toast.showToast({
								message: `Error: ${error.response.data.error}!`,
								variant: 'error',
							});
						} else if (error.request) {
							// No response received
							toast.showToast({
								message: 'Error: No response from server! Please try again later.',
								variant: 'error',
							});
						} else {
							// Other Axios error
							toast.showToast({
								message: `Error: ${error.message}!`,
								variant: 'error',
							});
						}
					} else if (error instanceof Error) {
						// Generic error handling
						toast.showToast({
							message: `Error: ${error.message}!`,
							variant: 'error',
						});
					} else {
						// Fallback for unknown error types
						toast.showToast({
							message: 'An unexpected error occurred!',
							variant: 'error',
						});
					}
				}
			}
		},
		successMessage: '',
	});

	const handleDeleteAccount = () => {
		console.log('Account Deleted!');
		showToast({
			message: 'Account Deleted!',
			variant: 'error',
		});
	};

	const handleDeletePhoto = () => {
		console.log('Photo Deleted!');
		showToast({
			message: 'Photo Deleted!',
			variant: 'error',
		});
	};

	const handleUpdatePhoto = () => {
		console.log('Picture Updated Successfully!');
		showToast({
			message: 'Picture Updated Successfully!',
			variant: 'success',
		});
	};

	if (fetchLoading) {
		return <PageLoader />;
	}

	if (error) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				autoComplete='off'>
				<Grid
					container
					rowSpacing={14}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					alignItems='center'>
					{/* First Name */}
					<Grid size={6}>
						<Typography variant='h3'>First name</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='firstName'
							name='firstName'
							value={values.firstName}
							onChange={handleChange}
							errorMessage={getError('firstName')}
							fullWidth={true}
							size='small'
						/>
					</Grid>

					{/* Last Name */}
					<Grid size={6}>
						<Typography variant='h3'>Last name</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='lastName'
							name='lastName'
							value={values.lastName}
							onChange={handleChange}
							errorMessage={getError('lastName')}
							fullWidth={true}
							size='small'
						/>
					</Grid>

					{/* Email */}
					<Grid size={6}>
						<Typography variant='h3'>Email</Typography>
						<Typography variant='subtitle1'>
							This is your current email address — it cannot be changed.
						</Typography>
					</Grid>
					<Grid size={6}>
						<FormInput
							id='email'
							name='email'
							type='email'
							value={values.email}
							onChange={handleChange}
							fullWidth={true}
							size='small'
							disabled={true}
						/>
					</Grid>

					{/* Photo */}
					<Grid size={6}>
						<Typography variant='h3'>Your photo</Typography>
						<Typography variant='subtitle1'>
							This photo will be displayed on your profile page.
						</Typography>
					</Grid>
					<Grid size={6}>
						<Box
							display='flex'
							alignItems='center'>
							<Box
								sx={{
									position: 'relative',
									width: 64,
									height: 64,
									borderRadius: '50%',
									overflow: 'hidden',
									'&:hover .avatar-edit-icon': {
										opacity: 1,
									},
								}}>
								<Avatar
									alt='Profile Picture'
									src='https://picsum.photos/200/200'
									// src={values.image}
									sx={{ width: 64, height: 64, mr: 7 }}
								/>

								<Box
									className='avatar-edit-icon'
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: 'rgba(0, 0, 0, 0.15)',
										color: 'white',
										opacity: 0,
										transition: 'opacity 0.3s',
										cursor: 'pointer',
									}}
									onClick={uploadModal.openModal}>
									<EditIcon fontSize='medium' />
								</Box>
							</Box>
							<Link
								href='#'
								underline='hover'
								sx={{ px: 4, color: 'text.secondary' }}
								onClick={deletePhotoModal.openModal}>
								Delete
							</Link>
							<Link
								href='#'
								underline='hover'
								sx={{ px: 4, color: 'text.brand' }}
								onClick={uploadModal.openModal}>
								Update
							</Link>
						</Box>
					</Grid>
				</Grid>

				{/* Save Button */}
				<Box
					display='flex'
					justifyContent='flex-end'
					mt={40}>
					<LoadingButton
						loading={loading}
						buttonText='Save'
						loadingText='Saving...'
						fullWidth={false}
					/>
				</Box>

				<Divider sx={{ mb: 7, mt: 14 }} />

				{/* Delete Account Section */}
				<Box
					display='flex'
					flexDirection='column'
					mb={4}
					rowGap={6}>
					<Typography
						variant='h3'
						fontWeight='bold'>
						Delete account
					</Typography>
					<Typography
						variant='subtitle1'
						sx={{ mb: 2 }}>
						Note that deleting your account will remove all data from our system. This is permanent
						and non-recoverable.
					</Typography>

					{/* Delete Account Button */}
					<Box justifyContent='flex-start'>
						<Button
							variant='contained'
							size='medium'
							color='error'
							onClick={deleteAccountModal.openModal}
							disabled={loading || fetchLoading ? true : false}>
							Delete account
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Delete Photo Modal */}
			<ModalWrapper
				variant='delete'
				title='Really delete this Photo?'
				description='When you delete this Photo, all the links associated with the Photo will also be removed. This action is non-reversible.'
				confirmButtonText='Delete Photo'
				open={deletePhotoModal.isOpen}
				onClose={handleDeletePhoto}
				toggleModal={deletePhotoModal.closeModal}
			/>

			{/* Upload Photo Modal */}
			<ModalWrapper
				variant='upload'
				title='Upload profile image'
				confirmButtonText='Update'
				open={uploadModal.isOpen}
				onClose={handleUpdatePhoto}
				maxFileSize='3 MB'
				fileFormats='JPG, PNG'
				toggleModal={uploadModal.closeModal}
			/>
			{/* Delete Account Modal */}
			<ModalWrapper
				variant='delete'
				title='Really delete this account?'
				description='If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable.'
				confirmButtonText='Delete account'
				cancelButtonText='Cancel'
				open={deleteAccountModal.isOpen}
				onClose={handleDeleteAccount}
				toggleModal={deleteAccountModal.closeModal}
			/>
		</>
	);
}
