'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import LockIcon from '../../../../public/assets/icons/auth/LockIcon';
import AuthFormWrapper from '../components/AuthFormWrapper';
import FormInput from '@/components/FormInput';
import PasswordValidation from '@/components/PasswordValidation';

import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { requiredFieldRule } from '@/utils/shared/validators';

export default function ResetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token');
	const email = searchParams.get('email');

	const { values, touched, handleChange, handleBlur, getError, validateAll } = useValidatedFormData(
		{
			initialValues: {
				password: '',
				confirmPassword: '',
			},
			validationRules: {
				password: [requiredFieldRule('Password is required')],
				confirmPassword: [requiredFieldRule('Confirm password is required')],
			},
		},
	);

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
				values.password.length < 8 ||
				!/[A-Z]/.test(values.password) ||
				!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)
			) {
				if (values.password) {
					toast.showToast({
						message:
							'Password must contain at least 8 characters, one uppercase letter and one symbol.',
						variant: 'warning',
					});
				}
				return;
			}

			if (values.password !== values.confirmPassword) {
				if (values.confirmPassword) {
					toast.showToast({
						message: 'Password and confirmation password do not match.',
						variant: 'warning',
					});
				}
				return;
			}

			await axios.post('/api/auth/resetPassForm', {
				email,
				password: values.password,
				token,
			});

			router.push(
				`/auth/password-reset-confirm?email=${email}&password=${encodeURIComponent(
					values.password,
				)}`,
			);
		},
		successMessage: '',
	});

	return (
		<AuthFormWrapper>
			<Box
				width={56}
				height={56}
				border='1px solid #EAECF0'
				display='flex'
				justifyContent='center'
				boxShadow='0px 1px 2px 0px #1018280D'
				alignItems='center'
				borderRadius='12px'>
				<LockIcon />
			</Box>

			<Typography
				variant='h2'
				mb={4}>
				Set new password
			</Typography>

			<Typography
				variant='subtitle2'
				mb={4}
				textAlign='center'>
				Your new password must be different from previously used passwords.
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={8}>
				<FormInput
					label='Password'
					id='password'
					type='password'
					placeholder='Create a password'
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('password')}
				/>

				<FormInput
					label='Confirm Password'
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('confirmPassword')}
				/>

				<PasswordValidation
					passwordValue={values.password}
					isBlur={touched.password}
				/>

				<LoadingButton
					loading={loading}
					buttonText='Reset password'
					loadingText='Resetting Password...'
				/>
			</Box>

			<NavLink
				href='/auth/sign-in'
				linkText='← Back to sign in'
				prefetch
			/>
		</AuthFormWrapper>
	);
}
