import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PasswordValidation from '@/components/PasswordValidation';
import LoadingButton from '@/components/LoadingButton';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { requiredFieldRule } from '@/utils/shared/validators';
import FormInput from '@/components/FormInput';
import { useFormSubmission } from '@/hooks/useFormSubmission';

export default function PasswordForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const { data: session } = useSession();

	const { values, setValues, touched, handleChange, handleBlur, getError, validateAll } =
		useValidatedFormData({
			initialValues: {
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			},
			validationRules: {
				currentPassword: [requiredFieldRule('Current password is required')],
				newPassword: [requiredFieldRule('New password is required')],
				confirmPassword: [requiredFieldRule('Please confirm your password')],
			},
		});

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

			if (
				values.newPassword.length < 8 ||
				!/[A-Z]/.test(values.newPassword) ||
				!/[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword)
			) {
				if (values.newPassword) {
					toast.showToast({
						message:
							'New password must contain at least 8 characters, one uppercase letter and one symbol.',
						variant: 'warning',
					});
				}
				return;
			}

			if (values.newPassword !== values.confirmPassword) {
				if (values.confirmPassword) {
					toast.showToast({
						message: 'New password and confirmation password do not match.',
						variant: 'warning',
					});
				}
				return;
			}

			try {
				// Make the POST request
				const response = await axios.post('/api/profile/changePassword', {
					email: session?.user.email,
					currentPassword: values.currentPassword,
					newPassword: values.newPassword,
				});

				// Handle success
				if (response.status === 200) {
					toast.showToast({
						message: 'Password updated successfully!',
						variant: 'success',
					});
					setIsSubmitted(true);
					setValues((prevValues) => ({
						...prevValues,
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
					}));
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
		},
		successMessage: '',
	});

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			noValidate
			autoComplete='off'>
			<Grid
				container
				rowSpacing={14}
				columnSpacing={{ xs: 5, sm: 10, md: 55 }}
				alignItems='center'>
				{/* Current Password */}
				<Grid size={5}>
					<Typography variant='h3'>Current Password</Typography>
				</Grid>
				<Grid size={7}>
					<FormInput
						id='currentPassword'
						name='currentPassword'
						type='password'
						value={values.currentPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={!isSubmitted ? getError('currentPassword') : undefined}
						fullWidth={true}
						size='small'
					/>
				</Grid>

				{/* New Password */}
				<Grid size={5}>
					<Typography variant='h3'>New Password</Typography>
				</Grid>
				<Grid size={7}>
					<FormInput
						id='newPassword'
						name='newPassword'
						type='password'
						value={values.newPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={!isSubmitted ? getError('newPassword') : undefined}
						fullWidth={true}
						size='small'
					/>
				</Grid>

				{/* Confirm Password */}
				<Grid size={5}>
					<Typography variant='h3'>Confirm Password</Typography>
				</Grid>
				<Grid size={7}>
					<FormInput
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						value={values.confirmPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						errorMessage={!isSubmitted ? getError('confirmPassword') : undefined}
						fullWidth={true}
						size='small'
					/>
				</Grid>

				{/* Real-time password strength feedback */}
				<Grid
					size={7}
					offset={'auto'}>
					<PasswordValidation
						passwordValue={values.newPassword}
						isBlur={touched.newPassword}
					/>
				</Grid>
			</Grid>

			{/* Save Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 40 }}>
				<LoadingButton
					loading={loading}
					buttonText='Save'
					loadingText='Saving...'
					fullWidth={false}
				/>
			</Box>
		</Box>
	);
}
