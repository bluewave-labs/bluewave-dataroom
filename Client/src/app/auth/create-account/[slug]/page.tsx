'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the next/navigation for App Router

const CreateAccountPage = ({ params }: { params: { slug: string } }) => {
	const router = useRouter();
	const [email, setEmail] = useState<string | null>(null);
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const token = params.slug; // Get token from URL params directly

	useEffect(() => {
		if (token) {
			const fetchUserDetails = async () => {
				try {
					const response = await fetch(`/api/invite/create-account?token=${token}`);
					if (response.ok) {
						const data = await response.json();
						setEmail(data.email); // Assuming the API returns the user's email
					} else {
						// Handle error (invalid token, etc.)
						router.push('/404'); // Redirect to a 404 page or an error page
					}
				} catch (error) {
					console.error('Failed to fetch user details:', error);
					router.push('/404'); // Redirect to a 404 page or an error page
				} finally {
					setLoading(false);
				}
			};

			fetchUserDetails();
		}
	}, [token, router]); // Include router in dependency array

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Send the name and password to create the account
		try {
			const response = await fetch('/api/invite/create-account', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token, name, password }),
			});

			if (response.ok) {
				const data = await response.json();
				alert(data.message); // Display success message
				router.push('/login'); // Redirect to login or another page
			} else {
				const errorData = await response.json();
				alert(errorData.message); // Display error message
			}
		} catch (error) {
			console.error('Failed to create account:', error);
			alert('Internal server error');
		}
	};

	if (loading) {
		return <div>Loading...</div>; // Show loading state while fetching
	}

	return (
		<div>
			<h1>Create Your Account</h1>
			<form onSubmit={handleSubmit}>
				<input type="email" value={email || ''} readOnly placeholder="Email" />
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Create Account</button>
			</form>
		</div>
	);
};

export default CreateAccountPage;
