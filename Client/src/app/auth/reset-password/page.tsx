'use client';
import NavLink from '@/components/NavLink';
import LoadingButton from '@/components/LoadingButton';
import Toast from '@/components/Toast';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useState, ChangeEvent } from 'react';
import LockIcon from '../../../../public/assets/icons/auth/LockIcon';
import AuthInput from '../components/AuthInput';
import PasswordValidation from '../components/PasswordValidation';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function SetNewPassword() {
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [passwordError, setPasswordError] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState({ length: false, specialChar: false });
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');

	const { loading, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			if (formData.password !== formData.confirmPassword) {
				setPasswordError('Passwords do not match');
				throw new Error('Password mismatch');
			}
			await axios.post('/api/auth/resetPass', { email, password: formData.password });
			router.push('/auth/password-reset-confirm');
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setFormData((prevData) => ({ ...prevData, password: newPassword }));
		setIsPasswordValid({
			length: newPassword.length >= 8,
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		});
	};

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
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display="flex"
				flexDirection="column"
				gap={5}>
				<AuthInput
					label="Password"
					id="password"
					type="password"
					placeholder="Create a password"
					value={formData.password}
					onChange={handlePasswordChange}
					required
				/>
				<AuthInput
					label="Confirm Password"
					id="confirmPassword"
					type="password"
					placeholder="Confirm your password"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>

				{passwordError && (
					<Typography color="error" variant="body2" mt={1} mb={1}>
						{passwordError}
					</Typography>
				)}

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
			<Toast
				message="Failed to reset password. Please try again."
				open={toast.open}
				hideToast={toast.hideToast}
				variant="error"
			/>
		</AuthFormWrapper>
	);
}
