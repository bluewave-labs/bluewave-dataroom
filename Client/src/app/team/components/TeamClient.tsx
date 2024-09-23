'use client';

import { dummyTeams } from '@/data/dummyTeams';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterToggle from './FilterToggle';
import UserTable, { User } from './UserTable';

export default function TeamClient() {
	const [filterRole, setFilterRole] = useState<
		'All' | 'Administrator' | 'Member'
	>('All');
	const [page, setPage] = useState(1);
	const [users, setUsers] = useState<User[]>([]);
	const [totalUsers, setTotalUsers] = useState(0);
	const pageSize = 5;

	useEffect(() => {
		const fetchUsers = () => {
			const filteredUsers =
				filterRole === 'All'
					? dummyTeams
					: dummyTeams.filter((user) => user.role === filterRole);

			setTotalUsers(filteredUsers.length);
			setUsers(filteredUsers.slice((page - 1) * pageSize, page * pageSize));
		};

		fetchUsers();
	}, [filterRole, page]);

	const handleFilterChange = (role: 'All' | 'Administrator' | 'Member') => {
		setFilterRole(role);
		setPage(1); // Reset to page 1 when the filter changes
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<FilterToggle
					currentFilter={filterRole}
					onFilterChange={handleFilterChange}
				/>
				<Button variant="contained" color="primary">
					Invite team member
				</Button>
			</Box>
			<Box marginTop="2rem">
				<UserTable
					users={users}
					page={page}
					setPage={setPage}
					filterRole={filterRole}
					pageSize={pageSize}
					totalUsers={totalUsers}
				/>
			</Box>
		</>
	);
}
