'use client';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	FormLabel,
	TextField,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import BluewaveLogo from '../../../../public/assets/BluewaveLogo';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordError, setPasswordError] = useState(''); // Track password mismatch error
	const [isPasswordValid, setIsPasswordValid] = useState({
		length: false,
		specialChar: false,
	});
	const router = useRouter();

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
		try {
			const response = await axios.post('/api/auth/register', {
				email,
				password,
				firstName,
				lastName,
			});
			console.log('User created successfully');
			router.push('/auth/account-created');
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.data) {
				const responseData = error.response.data;
				console.error('Error registering user:', responseData.message);
			} else {
				console.log('An error occurred');
			}
			setLoading(false);
		}
	};

	return (
		<Container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box display="flex" flexDirection="column" alignItems="center" mt={8} gap={10}>
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
					gap={3}
					display={'flex'}
					flexDirection={'column'}>
					{/* First Name */}
					<FormLabel htmlFor="firstName">
						<Typography color="text.primary" fontSize={15} fontWeight={500} mt={3} mb={1}>
							First name
						</Typography>
					</FormLabel>
					<TextField
						id="firstName"
						name="firstName"
						placeholder="Enter your name"
						autoComplete="given-name"
						size="small"
						autoFocus
						required
						fullWidth
						variant="outlined"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>

					{/* Last Name */}
					<FormLabel htmlFor="lastName">
						<Typography color="text.primary" fontSize={15} fontWeight={500} mt={3} mb={1}>
							Last name
						</Typography>
					</FormLabel>
					<TextField
						id="lastName"
						name="lastName"
						placeholder="Enter your surname"
						size="small"
						autoComplete="family-name"
						required
						fullWidth
						variant="outlined"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>

					{/* Email */}
					<FormLabel htmlFor="email">
						<Typography color="text.primary" fontSize={15} fontWeight={500} mt={3} mb={1}>
							Email
						</Typography>
					</FormLabel>
					<TextField
						id="email"
						type="email"
						name="email"
						placeholder="your_predefined_email@bluewave.ca"
						size="small"
						autoComplete="email"
						required
						fullWidth
						variant="outlined"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					{/* Password */}
					<FormLabel htmlFor="password">
						<Typography color="text.primary" fontSize={15} fontWeight={500} mt={3} mb={1}>
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

					{/* Confirm Password */}
					<FormLabel htmlFor="confirmPassword">
						<Typography color="text.primary" fontSize={15} fontWeight={500} mt={3} mb={1}>
							Confirm Password
						</Typography>
					</FormLabel>
					<TextField
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						placeholder="Create a password"
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
					<Box display="flex" alignItems="center" my={5} gap={5}>
						{isPasswordValid.length ? <CheckIcon color="success" /> : <CheckIcon />}
						<Typography variant="h4" ml={1}>
							Must be at least 8 characters
						</Typography>
					</Box>
					<Box display="flex" alignItems="center" mb={10} gap={5}>
						{isPasswordValid.specialChar ? <CheckIcon color="success" /> : <CheckIcon />}
						<Typography variant="h4" ml={1}>
							Must contain one special character
						</Typography>
					</Box>

					{/* Submit Button with Loading Indicator */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						disabled={loading}
						endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
						{loading ? 'Creating Account ...' : 'Get started'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
