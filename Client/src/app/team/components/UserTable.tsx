import Dropdown from '@/components/Dropdown';
import Paginator from '@/components/Paginator';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

export interface User {
	id: number;
	name: string;
	email: string;
	role: 'Administrator' | 'Member';
	createdAt: string;
}

interface Props {
	users: User[];
	page: number;
	setPage: (page: number) => void;
	filterRole: 'All' | 'Administrator' | 'Member';
	pageSize: number;
	totalUsers: number;
}

const UserTable = ({ users, page, setPage, pageSize, totalUsers }: Props) => (
	<>
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="User Table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '25%' }}>Name</TableCell>
						<TableCell sx={{ width: '40%' }}>Email</TableCell>
						<TableCell sx={{ width: '30%' }}>Role</TableCell>
						<TableCell sx={{ width: '5%' }}>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<Typography variant="subtitle1" sx={{ marginBottom: '-5px' }}>
									{user.name}
								</Typography>
								<Typography variant="caption" sx={{ color: 'text.secondary' }}>
									Created {user.createdAt}
								</Typography>
							</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Dropdown
									initialValue={user.role}
									variant="standard"
									options={[
										{ value: 'Administrator', label: 'Administrator' },
										{ value: 'Member', label: 'Member' },
									]}
									onValueChange={(newRole) => {
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
		<Paginator
			page={page}
			totalPages={Math.ceil(totalUsers / pageSize)}
			onPageChange={setPage}
			pageSize={pageSize}
			totalItems={totalUsers}
		/>
	</>
);

export default UserTable;
