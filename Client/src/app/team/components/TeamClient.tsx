'use client';
import { dummyTeams } from '@/data/dummyTeams';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import FilterToggle from './FilterToggle';
import UserTable, { User } from './UserTable';
import ModalWrapper from '@/components/ModalWrapper';

export default function TeamClient() {
	const [showInviteModal, setShowInviteModal] = useState(false);
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

	const handleInviteClick = () => {
		setShowInviteModal(true);
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<FilterToggle
					currentFilter={filterRole}
					onFilterChange={handleFilterChange}
				/>
				<Button variant="contained" color="primary" onClick={handleInviteClick}>
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

			<ModalWrapper
				variant="invite"
				title="Invite new team member"
				description="When you add a new team member, they will get access to all monitors."
				confirmButtonText="Send invite"
				toggleModal={setShowInviteModal}
				showModal={showInviteModal}
			/>
		</>
	);
}
