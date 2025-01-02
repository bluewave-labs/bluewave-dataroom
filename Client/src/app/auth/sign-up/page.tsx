'use client';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';
import FormInput from '@/components/FormInput';
import PasswordValidation from '@/components/PasswordValidation';

import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { requiredFieldRule, validEmailRule } from '@/utils/shared/validators';

export default function SignUp() {
	const router = useRouter();

	const { values, touched, handleChange, handleBlur, getError, validateAll } = useValidatedFormData(
		{
			initialValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
			validationRules: {
				firstName: [requiredFieldRule('First name is required')],
				lastName: [requiredFieldRule('Last name is required')],
				email: [requiredFieldRule('Email is required'), validEmailRule],
				password: [requiredFieldRule('Password is required')],
				confirmPassword: [requiredFieldRule('Please confirm your password')],
			},
		},
	);

	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// 1) Basic client checks
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

			// 2) Attempt server call
			const res = await axios.post('/api/auth/register', {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				password: values.password,
			});

			if (res.data.success) {
				// Partial success
				if (res.data.emailFail) {
					toast.showToast({
						message:
							res.data.message ||
							'Account created, Email sending is disabled in development. Contact admin.',
						variant: 'warning',
					});
					return router.push(`/auth/account-created?userId=${res.data.userId}`);
				}

				if (res.data.token) {
					router.push(`/auth/account-created?token=${res.data.token}`);
				} else {
					toast.showToast({ message: res.data.message, variant: 'success' });
				}
			} else {
				throw new Error(res.data.message || 'Unknown server error');
			}
		},
		successMessage: '', // We'll rely on custom logic above
	});

	return (
		<AuthFormWrapper>
			<Box mb={20}>
				<BluewaveLogo
					width={248}
					height={64}
				/>
			</Box>

			<Typography
				variant='h2'
				mb={12}>
				Create an account
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
					label='First name'
					id='firstName'
					placeholder='Enter your first name'
					value={values.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('firstName')}
				/>

				<FormInput
					label='Last name'
					id='lastName'
					placeholder='Enter your last name'
					value={values.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('lastName')}
				/>

				<FormInput
					label='Email'
					id='email'
					type='email'
					placeholder='your_email@bluewave.ca'
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('email')}
				/>

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

				{/* Real-time password strength feedback */}
				<PasswordValidation
					passwordValue={values.password}
					isBlur={touched.password}
				/>

				<LoadingButton
					loading={loading}
					buttonText='Get started'
					loadingText='Creating Account ...'
				/>
			</Box>

			<Box
				mt={25}
				display='flex'
				justifyContent='center'
				flexDirection='column'
				alignItems='center'
				gap={8}>
				<NavLink
					href='/auth/sign-in'
					linkText='← Back to sign in'
					prefetch
				/>
			</Box>
		</AuthFormWrapper>
	);
}
