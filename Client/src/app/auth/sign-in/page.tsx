'use client';

import { Box, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import CustomCheckbox from '@/components/CustomCheckbox';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';

import { useAuthForm } from '@/hooks/useAuthForm';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';
import { requiredFieldRule } from '@/utils/shared/validators';

export default function SignIn() {
	const router = useRouter();

	// 1) Manage form data
	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: {
			email: '',
			password: '',
			remember: false,
		},
		validationRules: {
			email: [requiredFieldRule('Email is required.')],
			password: [requiredFieldRule('Password is required.')],
		},
	});

	// 2) Hook for final form submission
	const { loading, handleSubmit } = useAuthForm({
		onSubmit: async () => {
			// Validate local fields
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			// 3) Attempt NextAuth credentials signIn
			const result = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
				remember: values.remember.toString(),
			});

			if (result?.error) {
				throw new Error(result.error);
			}

			// 4) On success, redirect
			router.push('/documents');
		},
		successMessage: 'Successfully signed in! Redirecting...',
	});

	return (
		<AuthFormWrapper>
			<Box my={30}>
				<BluewaveLogo
					width={248}
					height={64}
				/>
			</Box>

			<Typography
				variant='h2'
				mb={15}>
				Sign in to your account
			</Typography>

			<Box
				component='form'
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={5}>
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
					placeholder='••••••••••••••'
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					errorMessage={getError('password')}
				/>

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mt={8}
					mb={5}>
					<CustomCheckbox
						checked={values.remember}
						onChange={handleChange}
						name='remember'
						label='Remember for 30 days'
					/>
					<NavLink
						href='/auth/forgot-password'
						linkText='Forgot password?'
						prefetch
					/>
				</Box>

				<LoadingButton
					loading={loading}
					buttonText='Sign in'
					loadingText='Signing in...'
				/>
			</Box>

			<Typography
				variant='body1'
				mt={50}>
				Don&apos;t have an account?{' '}
				<NavLink
					href='/auth/sign-up'
					linkText='Sign up'
					ml={1}
					display='inline-flex'
					prefetch
				/>
			</Typography>
		</AuthFormWrapper>
	);
}
