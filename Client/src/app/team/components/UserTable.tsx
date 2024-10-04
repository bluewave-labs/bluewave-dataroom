import Dropdown from '@/components/Dropdown';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material';
import { useState } from 'react';

interface User {
	id: number;
	name: string;
	email: string;
	role: 'Administrator' | 'Member';
	createdAt: string;
}

interface Props {
	filterRole: 'All' | 'Administrator' | 'Member';
}

const UserTable = ({ filterRole }: Props) => {
	const [users, setUsers] = useState<User[]>([
		{
			id: 1,
			name: 'John Connor',
			email: 'john@domain.com',
			role: 'Administrator',
			createdAt: '10/4/2022',
		},
		{
			id: 2,
			name: 'Adam McFadden',
			email: 'adam@domain.com',
			role: 'Member',
			createdAt: '10/4/2022',
		},
		{
			id: 3,
			name: 'Cris Cross',
			email: 'cris@domain.com',
			role: 'Member',
			createdAt: '10/4/2022',
		},
		{
			id: 4,
			name: 'Prince',
			email: 'prince@domain.com',
			role: 'Member',
			createdAt: '10/4/2022',
		},
	]);
	const theme = useTheme();
	// Filter users based on selected role
	const filteredUsers =
		filterRole === 'All'
			? users
			: users.filter((user) => user.role === filterRole);

	// const handleRoleChange = async (userId: number, newRole: string) => {
	// 	try {
	// 		await axios.post('/api/update-role', { userId, role: newRole });
	// 		setUsers((prevUsers) =>
	// 			prevUsers.map((user) =>
	// 				user.id === userId ? { ...user, role: newRole } : user
	// 			)
	// 		);
	// 		console.log('Role updated successfully');
	// 	} catch (error) {
	// 		console.error('Failed to update role', error);
	// 	}
	// };

	const options = [
		{ value: 'Administrator', label: 'Administrator' },
		{ value: 'Member', label: 'Member' },
	];

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Typography variant="subtitle1" sx={{ marginBottom: '-5px' }}>
									{user.name}
								</Typography>
								<Typography
									variant="caption"
									sx={{ color: theme.palette.primary.light }}>
									Created {user.createdAt}
								</Typography>
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Dropdown
									initialValue={user.role}
									variant="standard"
									options={options}
									onValueChange={(newRole) => {
										// handleRoleChange(user.id, newRole); // Uncomment when backend is ready
										console.log(
											`Role changed to ${newRole} for user ${user.id}`
										);
									}}
								/>
							</TableCell>
							<TableCell>
								<IconButton>
									<DeleteIcon color="secondary" />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserTable;
