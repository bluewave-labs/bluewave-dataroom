'use client';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import Toast from '@/components/Toast';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useFormData } from '@/hooks/useFormData';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import LockIcon from '../../../../../public/assets/icons/auth/LockIcon';
import AuthFormWrapper from '../../components/AuthFormWrapper';
import AuthInput from '../../components/AuthInput';
import PasswordValidation from '../../components/PasswordValidation';
import { signIn } from 'next-auth/react';

interface SetNewPassword {
	token: string;
}

export default function SetNewPassword({ params }: { params: SetNewPassword }) {
	const { formData, handleChange } = useFormData({
		password: '',
		confirmPassword: '',
	});
	const [isPasswordValid, setIsPasswordValid] = useState({ length: false, specialChar: false });
	const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});
	const [showErrors, setShowErrors] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');
	const token = params.token;

	const { loading, error, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			// Set inline validation errors
			const errors: Record<string, string> = {};

			if (!formData.password) errors.password = 'Password is required';
			if (!formData.confirmPassword) errors.confirmPassword = 'Confirm password is required';
			if (formData.password && formData.password !== formData.confirmPassword) {
				errors.confirmPassword = 'Passwords do not match';
			}

			setInlineErrors(errors);

			if (Object.keys(errors).length > 0) {
				throw new Error('Validation error');
			}

			// Send request if there are no errors
			await axios.post('/api/auth/resetPassForm', {
				email,
				password: formData.password,
				token: token,
			});

			// Sign the user in after resetting password
			const signInResult = await signIn('credentials', {
				redirect: false,
				email,
				password: formData.password,
			});

			if (signInResult?.error) {
				// Handle sign-in error (e.g., show a toast)
				throw new Error('Sign-in failed. Please try again.');
			}

			// Redirect to a success page or dashboard after successful sign-in
			router.push('/auth/password-reset-confirm');
		},
		isServerError: (err) => !!err.response,
	});

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		handleChange(event); // Update formData
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

	const toastMessage = error || 'Failed to reset password. Please try again.';

	return (
		<AuthFormWrapper>
			<Box
				width={56}
				height={56}
				border="1px solid #EAECF0"
				display="flex"
				justifyContent="center"
				boxShadow="0px 1px 2px 0px #1018280D"
				alignItems="center"
				borderRadius="12px">
				<LockIcon />
			</Box>

			<Typography variant="h2" mb={4}>
				Set new password
			</Typography>

			<Typography variant="subtitle2" mb={4} textAlign="center">
				Your new password must be different from previously used passwords.
			</Typography>

			<Box
				component="form"
				onSubmit={onSubmitForm}
				noValidate
				minWidth={400}
				display="flex"
				flexDirection="column"
				gap={8}>
				<AuthInput
					label="Password"
					id="password"
					type="password"
					placeholder="Create a password"
					value={formData.password}
					onChange={handlePasswordChange}
					required
					showErrors={showErrors}
					errorMessage={inlineErrors.password || ''}
				/>
				<AuthInput
					label="Confirm Password"
					id="confirmPassword"
					type="password"
					placeholder="Confirm your password"
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
					buttonText="Reset password"
					loadingText="Resetting Password..."
				/>
			</Box>

			<NavLink href="/auth/sign-in" linkText="← Back to sign in" prefetch={true} />
			<Toast message={toastMessage} open={toast.open} hideToast={toast.hideToast} variant="error" />
		</AuthFormWrapper>
	);
}
