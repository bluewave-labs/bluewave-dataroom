'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	FormLabel,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import Title from '../../../../public/assets/icons/sidebar/SidebarTitle';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [remember, setRemember] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else {
			router.push('/');
		}
	};
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		setRemember(true);
	};
	return (
		<Container
			component="main"
			sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box display="flex" flexDirection="column" alignItems="center" mt={8}>
				<Box mb={50}>
					<Title width={244} height={64} />
				</Box>

				<Typography variant="h1" mb={15}>
					Sign in to your account
				</Typography>

				<Box component="form" onSubmit={handleSubmit} noValidate minWidth={400}>
					<FormLabel htmlFor="email">
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							mt={10}
							mb={3}>
							Email
						</Typography>
					</FormLabel>
					<TextField
						id="email"
						type="email"
						name="email"
						placeholder="your@bluewave.com"
						autoComplete="email"
						autoFocus
						required
						fullWidth
						variant="outlined"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<FormLabel htmlFor="password">
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							mt={10}
							mb={3}>
							Password
						</Typography>
					</FormLabel>
					<TextField
						id="password"
						type="password"
						name="password"
						placeholder="••••••••••••••••••••••••"
						autoComplete="current-password"
						required
						fullWidth
						variant="outlined"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mt={8}
						mb={5}>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember for 30 days"
						/>
						{/* <CustomCheckbox
							checked={false}
							onChange={handleCheckboxChange}
							name="rememberPassword"
							label="Remember for 30 days"
						/> */}
						<Link href="#" color="text.brand" underline="none">
							Forgot password?
						</Link>
					</Box>

					{error && (
						<Typography color="error" variant="body2" mt={2} mb={2}>
							{error}
						</Typography>
					)}

					<Button type="submit" fullWidth variant="contained">
						Sign in
					</Button>
				</Box>

				<Typography variant="body1" mt={50}>
					Don't have an account?
					<Link href="#" color="text.brand" underline="none" ml={1}>
						Sign up
					</Link>
				</Typography>
			</Box>
		</Container>
	);
}
