'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the new router from next/navigation
import middleware from '@/middleware';

export default function ResetPassword({ params }) {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter(); // Use the new router from next/navigation

	const token = params.token;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match.');
			return;
		}
		try {
			const response = await fetch(`/api/auth/resetPassForm/${token}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token, password }),
			});

			if (response.ok) {
				setMessage('Password has been reset successfully.');
				setTimeout(() => {
					router.push('/signIn');
				}, 1000);
			} else {
				const data = await response.json();
				setMessage(
					data.message || 'Failed to reset password. Please try again.'
				);
			}
		} catch (error) {
			console.error('Error resetting password:', error);
			setMessage('Failed to reset password. Please try again.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white rounded-md shadow-md p-6">
				<h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
					Reset Password
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="password"
						placeholder="Enter new password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
					/>
					<input
						type="password"
						placeholder="Confirm new password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
					/>
					<button
						type="submit"
						className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
						Reset Password
					</button>
				</form>
				{message && (
					<p className="mt-4 text-center text-sm text-gray-600">{message}</p>
				)}
			</div>
		</div>
	);
}
