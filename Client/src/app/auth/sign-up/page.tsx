'use client';
import AuthInput from '../components/AuthInput';
import PasswordValidation from '../components/PasswordValidation';
import LoadingButton from '@/components/LoadingButton';
import Toast from '@/components/Toast';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useState, ChangeEvent } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function SignUp() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [passwordError, setPasswordError] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState({ length: false, specialChar: false });
	const router = useRouter();

	const { loading, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			if (formData.password !== formData.confirmPassword) {
				setPasswordError('Passwords do not match');
				throw new Error('Password mismatch');
			}
			await axios.post('/api/auth/register', {
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			});
			router.push('/auth/account-created');
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setFormData((prevData) => ({ ...prevData, password: newPassword }));
		setIsPasswordValid({
			length: newPassword.length >= 8,
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		});
	};

	return (
		<AuthFormWrapper>
			<Box mb={20}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" mb={12}>
				Create an account
			</Typography>

			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				minWidth={400}
				display="flex"
				flexDirection="column"
				gap={3}>
				<AuthInput
					label="First name"
					id="firstName"
					placeholder="Enter your name"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
				<AuthInput
					label="Last name"
					id="lastName"
					placeholder="Enter your surname"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
				<AuthInput
					label="Email"
					id="email"
					type="email"
					placeholder="your_predefined_email@bluewave.ca"
					value={formData.email}
					onChange={handleChange}
					required
				/>
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
					buttonText="Get started"
					loadingText="Creating Account ..."
				/>
			</Box>

			<Toast
				message="Registration failed. Please try again."
				open={toast.open}
				hideToast={toast.hideToast}
				variant="error"
			/>
		</AuthFormWrapper>
	);
}
