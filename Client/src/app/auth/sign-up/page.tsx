'use client';
import LoadingButton from '@/components/LoadingButton';
import Toast from '@/components/Toast';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useFormData } from '@/hooks/useFormData';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';
import PasswordValidation from '../components/PasswordValidation';
import NavLink from '@/components/NavLink';

export default function SignUp() {
	const { formData, handleChange } = useFormData({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [isPasswordValid, setIsPasswordValid] = useState({ length: false, specialChar: false });
	const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});
	const [showErrors, setShowErrors] = useState(false);
	const router = useRouter();

	const { loading, error, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			// Perform inline validation for client-side errors
			const errors: Record<string, string> = {};

			if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
				errors.email = 'Please enter a valid email address.';
			}

			if (formData.password !== formData.confirmPassword) {
				errors.confirmPassword = 'Passwords do not match';
			}

			if (!formData.firstName) errors.firstName = 'First name is required';
			if (!formData.lastName) errors.lastName = 'Last name is required';

			setInlineErrors(errors);

			if (Object.keys(errors).length > 0) {
				throw new Error('Validation error');
			}

			// Proceed with form submission if no validation errors
			await axios.post('/api/auth/register', {
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			});

			router.push('/auth/account-created');
		},
		isServerError: (err) => !!err.response, // Show toast if error has a server response
	});

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		handleChange(event);
		setIsPasswordValid({
			length: newPassword.length >= 8,
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		});
	};

	const onSubmitForm = (event: FormEvent) => {
		event.preventDefault();
		setShowErrors(true);
		handleSubmit(event);
	};

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
				onSubmit={onSubmitForm}
				noValidate
				minWidth={400}
				display='flex'
				flexDirection='column'
				gap={8}>
				<AuthInput
					label='First name'
					id='firstName'
					placeholder='Enter your name'
					value={formData.firstName}
					onChange={handleChange}
					required
					showErrors={showErrors}
					errorMessage={inlineErrors.firstName || ''}
				/>
				<AuthInput
					label='Last name'
					id='lastName'
					placeholder='Enter your surname'
					value={formData.lastName}
					onChange={handleChange}
					required
					showErrors={showErrors}
					errorMessage={inlineErrors.lastName || ''}
				/>
				<AuthInput
					label='Email'
					id='email'
					type='email'
					placeholder='your_email@bluewave.ca'
					value={formData.email}
					onChange={handleChange}
					required
					showErrors={showErrors}
					errorMessage={inlineErrors.email || ''}
				/>
				<AuthInput
					label='Password'
					id='password'
					type='password'
					placeholder='Create a password'
					value={formData.password}
					onChange={handlePasswordChange}
					required
					showErrors={showErrors}
				/>
				<AuthInput
					label='Confirm Password'
					id='confirmPassword'
					type='password'
					placeholder='Confirm your password'
					value={formData.confirmPassword}
					onChange={handleChange}
					required
					showErrors={showErrors}
					errorMessage={inlineErrors.confirmPassword || ''}
				/>

				<PasswordValidation
					isLengthValid={isPasswordValid.length}
					hasSpecialChar={isPasswordValid.specialChar}
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
					prefetch={true}
				/>
			</Box>
		</AuthFormWrapper>
	);
}
