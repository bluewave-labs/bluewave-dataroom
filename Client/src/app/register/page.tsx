'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the new router from next/navigation
import axios, { AxiosError } from 'axios';

interface ErrorResponse {
	message: string;
}

const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState('USER');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const router = useRouter(); // Use the new router from next/navigation

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			const response = await axios.post('/api/auth/register', {
				email,
				password,
				name,
				role,
			});

			setSuccess('User created successfully');
			setTimeout(() => {
				router.push('/signIn');
			}, 1000);
		} catch (error: unknown) {
			// If it's an Axios error, we assume the response has a message
			if (axios.isAxiosError(error) && error.response?.data) {
				const responseData = error.response.data as ErrorResponse;
				setError(responseData.message || 'An error occurred');
				console.error('Error registering user:', error);
			} else {
				setError('An error occurred');
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
				<h1 className="text-2xl font-extrabold text-gray-900 text-center">
					Register
				</h1>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Email"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
						<div>
							<label htmlFor="name" className="sr-only">
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Name"
							/>
						</div>
						<div>
							<label htmlFor="role" className="sr-only">
								Role
							</label>
							<select
								id="role"
								name="role"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm">
								<option value="USER">USER</option>
								<option value="ADMIN">ADMIN</option>
								<option value="COACH">COACH</option>
								<option value="CLIENT">CLIENT</option>
							</select>
						</div>
					</div>
					<button
						type="submit"
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
						Register
					</button>
				</form>
				{error && (
					<p className="mt-2 text-center text-sm text-red-600">{error}</p>
				)}
				{success && (
					<p className="mt-2 text-center text-sm text-green-600">{success}</p>
				)}
			</div>
		</div>
	);
};

export default Register;
