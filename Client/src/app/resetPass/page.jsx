'use client';
import axios from 'axios';
import { useState } from 'react';

const ResetPasswordForm = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/auth/resetPass', { email });

			if (response.status === 201) {
				setMessage('A reset password link has been sent to your email.');
			} else {
				setMessage('Failed to send reset password link. Please try again.');
			}
		} catch (error) {
			setMessage('Failed to send reset password link. Please try again.');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
			<h2 className="text-2xl font-semibold mb-4 text-center text-orange-600">
				Reset Password
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700">
						Email:
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
						placeholder="Enter your email"
					/>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
					Submit
				</button>
			</form>
			{message && (
				<p className="mt-4 text-center text-sm text-gray-600">{message}</p>
			)}
		</div>
	);
};

export default ResetPasswordForm;
