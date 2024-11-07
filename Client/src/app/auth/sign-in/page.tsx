'use client';
import CustomCheckbox from '@/components/CustomCheckbox';
import NavLink from '@/components/NavLink';
import AuthInput from '../components/AuthInput';
import LoadingButton from '@/components/LoadingButton';
import Toast from '@/components/Toast';
import { Box, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import { useAuthForm } from '@/hooks/useAuthForm';
import AuthFormWrapper from '../components/AuthFormWrapper';

export default function SignIn() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		remember: false,
	});
	const router = useRouter();

	const { loading, handleSubmit, toast } = useAuthForm({
		onSubmit: async () => {
			const result = await signIn('credentials', {
				redirect: false,
				email: formData.email,
				password: formData.password,
			});
			if (result?.error) throw new Error(result.error);
			router.push('/documents');
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value, checked, type } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: type === 'checkbox' ? checked : value,
		}));
	};
	return (
		<AuthFormWrapper>
			<Box my={30}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" mb={15}>
				Sign in to your account
			</Typography>

			<Box component="form" onSubmit={handleSubmit} noValidate minWidth={400}>
				<AuthInput
					label="Email"
					id="email"
					type="email"
					placeholder="your_email@bluewave.ca"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<AuthInput
					label="Password"
					id="password"
					type="password"
					placeholder="••••••••••••••"
					value={formData.password}
					onChange={handleChange}
					required
				/>

				<Box display="flex" justifyContent="space-between" alignItems="center" mt={8} mb={5}>
					<CustomCheckbox
						checked={formData.remember}
						onChange={handleChange}
						name="remember"
						label="Remember for 30 days"
					/>
					<NavLink href="/auth/forgot-password" linkText="Forgot password?" prefetch={true} />
				</Box>

				<LoadingButton loading={loading} buttonText="Sign in" loadingText="Signing in..." />
			</Box>

			<Typography variant="body1" mt={50}>
				Don't have an account?{' '}
				<NavLink
					href="/auth/sign-up"
					linkText="Sign up"
					ml={1}
					display="inline-flex"
					prefetch={true}
				/>
			</Typography>

			<Toast
				message="Sign-in failed. Please try again."
				open={toast.open}
				hideToast={toast.hideToast}
				variant="error"
			/>
		</AuthFormWrapper>
	);
}
