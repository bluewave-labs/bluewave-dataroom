'use client';

import Paginator from '@/components/Paginator';
import { dummyData } from '@/data/dummyContacts';
import { useSort } from '@/hooks/useSort';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { useState } from 'react';
import ContactsTableRow from './ContactsTableRow';
import { Contact } from '@/utils/shared/models';
import EmptyState from '@/components/EmptyState';

const ContactsTable = () => {
	const pageSize = 12;
	const [page, setPage] = useState(1);

	// Sort the entire data set
	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Contact>(
		dummyData,
		undefined,
		(a: Contact, b: Contact, orderDirection: 'asc' | 'desc' | undefined): number => {
			const timeA = new Date(a.lastActivity).getTime();
			const timeB = new Date(b.lastActivity).getTime();
			return orderDirection === 'asc' ? timeA - timeB : timeB - timeA;
		},
	);

	// Paginate the sorted data
	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	const totalPages = Math.ceil(sortedData.length / pageSize);

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
						{!paginatedData.length ? (
							<TableRow>
								<TableCell
									colSpan={4}
									sx={{ width: '100%' }}>
									<EmptyState message='When users download a file and provide personal information, they will appear here.' />
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((row) => (
								<ContactsTableRow
									key={row.userId}
									contact={row}
								/>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			{totalPages > 1 && (
				<Paginator
					page={page}
					totalPages={totalPages}
					onPageChange={setPage}
					pageSize={pageSize}
					totalItems={dummyData.length}
				/>
			)}
		</>
	);
};

export default ContactsTable;
