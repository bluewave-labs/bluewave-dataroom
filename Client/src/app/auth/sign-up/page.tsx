// Client/src/app/auth/sign-up/page.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';
import PasswordValidation from '../components/PasswordValidation';
import NavLink from '@/components/NavLink';
import LoadingButton from '@/components/LoadingButton';

import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { useAuthForm } from '@/hooks/useAuthForm';
import {
	requiredFieldRule,
	validEmailRule, // optional if you want strict email checks
	minLengthRule,
	// hasSpecialCharRule, // if you want a direct rule for the password itself
} from '@/utils/shared/validators';

export default function SignUp() {
	const router = useRouter();

	// 1) Manage form data & inline validation with useValidatedFormData
	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
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
			email: [
				requiredFieldRule('Email is required'),
				validEmailRule, // If you want email format validation
			],
			password: [
				requiredFieldRule('Password is required'),
				minLengthRule(8, 'Password must be at least 8 characters'),
				// If you want to enforce a special char as well:
				// hasSpecialCharRule,
			],
			confirmPassword: [
				requiredFieldRule('Please confirm your password'),
				// For real-time mismatch, you'd need a custom rule referencing values.password
			],
		},
	});

	// 2) handleSubmit from useAuthForm: final submission + server call
	const { loading, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			// Validate all fields first
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			// Check if passwords match
			if (values.password !== values.confirmPassword) {
				throw new Error('Passwords do not match.');
			}

			// Send data to server
			const res = await axios.post('/api/auth/register', {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				password: values.password,
			});

			// 3) If creation or partial success
			if (res.data.success) {
				// If email sending failed but user created:
				if (res.data.emailFail) {
					// We can throw a custom message or treat it as success
					// For example, treat it as a success but show a custom toast in onError below
					throw new Error('Account created, Email sending is disabled in development.');
				} else {
					// All good
					router.push('/auth/account-created');
					return;
				}
			} else {
				// If not success, throw to trigger toast
				throw new Error(res.data.message || 'Unknown server error');
			}
		},

		successMessage: '',
		onError: (errMsg) => {
			if (errMsg.includes('Account created, Email sending is disabled in development.')) {
				toast.showToast({ message: 'Account Created!', variant: 'success' });
				// Optionally another toast
				toast.showToast({
					message: 'Please contact your Admin for verification.',
					variant: 'warning',
				});
			}
		},
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
				<AuthInput
					label='First name'
					id='firstName'
					placeholder='Enter your first name'
					value={values.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('firstName')}
				/>

				<AuthInput
					label='Last name'
					id='lastName'
					placeholder='Enter your last name'
					value={values.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('lastName')}
				/>

				<AuthInput
					label='Email'
					id='email'
					type='email'
					placeholder='your_email@bluewave.ca'
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('email')}
				/>

				<AuthInput
					label='Password'
					id='password'
					type='password'
					placeholder='Create a password'
					value={values.password}
					onChange={handleChange} // no custom function needed
					onBlur={handleBlur}
					errorMessage={getError('password')}
				/>

				<AuthInput
					label='Confirm Password'
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('confirmPassword')}
				/>

				{/* 
          Use PasswordValidation for real-time strength feedback.
          We just pass values.password, and it calculates length/special char.
        */}
				<PasswordValidation passwordValue={values.password} />

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
