'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError(result.error);
		} else {
			setSuccess('Logged in successfully');
			setTimeout(() => {
				router.push('/');
			});
		}
	};

	return (
		<div className="flex justify-center items-start h-screen">
			<div
				className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8"
				style={{ width: '500px' }}>
				<div className="max-w-md w-full space-y-8 p-10 bg-grey rounded-xl shadow-lg">
					<h1 className="text-2xl font-extrabold text-gray-900 text-center">
						Login
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
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
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
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm">
								<a
									href="/resetPass"
									className="font-medium text-orange-600 hover:text-orange-500">
									Forgot Password?
								</a>
							</div>
						</div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
							Login
						</button>
					</form>
					{error && (
						<div
							className="bg-red-100 border-t border-b border-orange-500 text-orange-700 px-4 py-3"
							role="alert">
							<p className="font-bold">Warning!</p>
							<p className="text-sm">
								Username/password combination incorrect. Please try again.
							</p>
						</div>
					)}
					{success && (
						<p className="mt-2 text-center text-sm text-green-600">{success}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignIn;
