'use client';
import React, { useState } from 'react';

const InviteMember = () => {
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('USER');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/invite/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, role }),
			});

			if (response.ok) {
				console.log('Invite Sent Successfully');
				setEmail('');
				setRole('USER');
			} else {
				console.error('Failed to send invite');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<h2>Invite Member</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<label htmlFor="role">Role:</label>
					<select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
						<option value="ADMIN">ADMIN</option>
						<option value="USER">USER</option>
					</select>
				</div>

				<button type="submit">Invite</button>
			</form>
		</div>
	);
};

export default InviteMember;
