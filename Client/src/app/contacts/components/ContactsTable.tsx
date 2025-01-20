'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	Box,
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import { Contact } from '@/utils/shared/models';
import { useSort } from '@/hooks/useSort';
import Paginator from '@/components/Paginator';
import ContactsTableRow from './ContactsTableRow';

export default function ContactsTable() {
	const pageSize = 12;
	const [page, setPage] = useState(1);
	const [data, setData] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		try {
			const response = await axios.get('/api/contacts');
			const contacts = response.data.data as Contact[];

			const parsedContacts = contacts.map((contact) => ({
				...contact,
				lastActivity: new Date(contact.lastActivity),
			}));
			setData(parsedContacts);
		} catch (err: any) {
			setError(err.message || 'An error occurred while fetching contacts.');
		} finally {
			setLoading(false);
		}
	};

	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Contact>(
		data,
		'lastActivity',
	);

	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);
	const totalPages = Math.ceil(sortedData.length / pageSize);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box mt={4}>
				<Typography
					color='error'
					align='center'
					variant='h6'>
					{error}
				</Typography>
			</Box>
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
								key={row.id}
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
}
