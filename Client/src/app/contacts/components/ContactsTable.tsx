'use client';
import Paginator from '@/components/Paginator';
import { useSort } from '@/hooks/useSort';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography,
} from '@mui/material';
import ContactsTableRow from './ContactsTableRow';
import { Contact } from '@/utils/shared/models';
import { useEffect, useState } from 'react';

const ContactsTable = () => {
	const pageSize = 12;
	const [page, setPage] = useState(1);
	const [data, setData] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		handleData();
	}, []);

	const handleData = async () => {
		try {
			const response = await fetch('api/contacts');
			if (!response.ok) {
				throw new Error('Failed to fetch contacts');
			}
			const result = await response.json();
			setData(result.data);
		} catch (err: any) {
			setError(err.message || 'An error occured');
		} finally {
			setLoading(false);
		}
	};

	// Sort the entire data set
	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Contact>(
		data,
		'lastActivity',
		(a: Contact, b: Contact, orderDirection: 'asc' | 'desc' | undefined): number => {
			const timeA = new Date(a.lastActivity).getTime();
			const timeB = new Date(b.lastActivity).getTime();
			return orderDirection === 'asc' ? timeA - timeB : timeB - timeA;
		},
	);

	// Paginate the sorted data
	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	const totalPages = Math.ceil(sortedData.length / pageSize);

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return (
			<Typography
				color='error'
				align='center'
				variant='h6'
				style={{ marginTop: '20px' }}>
				{error}
			</Typography>
		);
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table aria-label='Contacts Table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '30%' }}>NAME</TableCell>
							<TableCell sx={{ width: '25%' }}>LAST VIEWED LINK</TableCell>
							<TableCell sx={{ width: '30%' }}>
								<TableSortLabel
									active={orderBy === 'lastActivity'}
									direction={orderDirection}
									onClick={() => handleSortRequest('lastActivity')}
									hideSortIcon={false}
									IconComponent={
										orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon
									}>
									LAST ACTIVITY
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ width: '15%' }}>VISITS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((row) => (
							<ContactsTableRow
								key={row.userId}
								contact={row}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{totalPages > 1 && (
				<Paginator
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
					pageSize={pageSize}
					totalItems={data.length}
				/>
			)}
		</>
	);
};

export default ContactsTable;
