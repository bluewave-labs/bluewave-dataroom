'use client';
import CustomCheckbox from '@/components/CustomCheckbox';
import LoadingButton from '@/components/LoadingButton';
import NavLink from '@/components/NavLink';
import Toast from '@/components/Toast';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useFormData } from '@/hooks/useFormData';
import { Box, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import AuthFormWrapper from '../components/AuthFormWrapper';
import AuthInput from '../components/AuthInput';

export default function SignIn() {
	const { formData, handleChange } = useFormData({
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

	return (
		<AuthFormWrapper>
			<Box my={30}>
				<BluewaveLogo width={248} height={64} />
			</Box>

			<Typography variant="h2" mb={15}>
				Sign in to your account
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
