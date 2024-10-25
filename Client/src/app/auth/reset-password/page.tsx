'use client';
import NavLink from '@/components/NavLink';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormLabel,
	TextField,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';
import LockIcon from '../../../../public/assets/icons/auth/LockIcon';

export default function SetNewPassword() {
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [isPasswordValid, setIsPasswordValid] = useState({
		length: false,
		specialChar: false,
	});

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		// Check password length and special character
		setIsPasswordValid({
			length: newPassword.length >= 8,
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		// Clear the password error state first
		setPasswordError('');

		// Validate password and confirmPassword match
		if (password !== confirmPassword) {
			setPasswordError('Passwords do not match');
			setLoading(false);
			return;
		}

		// Continue reset password logic here (e.g., API request)
		setLoading(false);
		router.push('/auth/password-reset-confirm'); // Redirect after successful reset
	};

	return (
		<Container
			component="main"
			sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				mt={8}
				gap={10}>
				{/* Icon Placeholder */}
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

				{/* Password Form */}
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					minWidth={400}
					display={'flex'}
					flexDirection={'column'}
					gap={5}>
					{/* Password Field */}
					<FormLabel htmlFor="password">
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							mb={1}>
							Password
						</Typography>
					</FormLabel>
					<TextField
						id="password"
						type="password"
						name="password"
						placeholder="Create a password"
						size="small"
						autoComplete="new-password"
						required
						fullWidth
						variant="outlined"
						value={password}
						onChange={handlePasswordChange}
					/>

					{/* Confirm Password Field */}
					<FormLabel htmlFor="confirmPassword">
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							mb={1}>
							Confirm password
						</Typography>
					</FormLabel>
					<TextField
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						placeholder="Confirm your password"
						size="small"
						autoComplete="new-password"
						required
						fullWidth
						variant="outlined"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{/* Password Error Message */}
					{passwordError && (
						<Typography color="error" variant="body2" mt={1} mb={1}>
							{passwordError}
						</Typography>
					)}

					{/* Password Validations */}
					<Box display="flex" alignItems="center" my={3} gap={5}>
						{isPasswordValid.length ? (
							<CheckIcon color="success" />
						) : (
							<CheckIcon />
						)}
						<Typography variant="h4" ml={1}>
							Must be at least 8 characters
						</Typography>
					</Box>
					<Box display="flex" alignItems="center" mb={3} gap={5}>
						{isPasswordValid.specialChar ? (
							<CheckIcon color="success" />
						) : (
							<CheckIcon />
						)}
						<Typography variant="h4" ml={1}>
							Must contain one special character
						</Typography>
					</Box>

					{/* Submit Button */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						disabled={loading}
						endIcon={
							loading ? <CircularProgress size={20} color="inherit" /> : null
						}>
						{loading ? 'Resetting Password...' : 'Reset password'}
					</Button>
				</Box>

				<NavLink
					href="/auth/sign-in"
					linkText="← Back to sign in"
					prefetch={true}
				/>
			</Box>
		</Container>
	);
}
