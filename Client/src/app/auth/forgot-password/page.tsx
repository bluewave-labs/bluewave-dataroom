'use client';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import Toast from '@/components/Toast';
import { useFormData } from '@/hooks/useFormData';
import { useToast } from '@/hooks/useToast';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import KeyIcon from '../../../../public/assets/icons/auth/KeyIcon';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';

export default function ForgotPassword() {
	const router = useRouter();
	const { formData, handleChange } = useFormData({ email: 'your_email@bluewave.ca' });
	const [loading, setLoading] = useState(false);
	const errorToast = useToast();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post('/api/auth/resetPass', { email: formData.email });

			router.push(response.data.url);
		} catch (error) {
			console.error('Error verifying email:', error);
			errorToast.showToast();
		} finally {
			setLoading(false);
		}
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
				<KeyIcon />
			</Box>

			<Typography variant="h2" mb={4}>
				Forgot password?
			</Typography>

			<Typography variant="subtitle2" color="text.secondary" mb={4} textAlign="center">
				No worries, we’ll send you reset instructions.
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
					label="Email"
					id="email"
					type="email"
					placeholder="Enter your email"
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<Box
					mt={10}
					display="flex"
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
					gap={8}>
					<LoadingButton
						loading={loading}
						buttonText="Reset password"
						loadingText="Verifying Email..."
						fullWidth
					/>

					<NavLink href="/auth/sign-in" linkText="← Back to sign in" prefetch={true} />
				</Box>
			</Box>

			<Toast
				message="Email not found. Please try again or sign up."
				open={errorToast.open}
				hideToast={errorToast.hideToast}
				variant="error"
			/>
		</AuthFormWrapper>
	);
}
