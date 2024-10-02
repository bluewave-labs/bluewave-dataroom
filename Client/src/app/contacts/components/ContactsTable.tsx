'use client';

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
import { useMemo, useState } from 'react';
import TableRowComponent from './TableRowComponent';

// Dummy Data
const rows = [
	{
		userId: '1',
		name: 'Jack Murano',
		lastViewedLink: 'Link #1284',
		lastActivity: new Date('July 1, 2024 8:10 PM'),
		visits: 5,
	},
	{
		userId: '2',
		name: 'Gorkem Cetin',
		lastViewedLink: 'Link #1284',
		lastActivity: new Date('July 5, 2024 4:30 AM'),
		visits: 3,
	},
	{
		userId: '3',
		name: 'Jack Murano',
		lastViewedLink: 'Link #1284',
		lastActivity: new Date('July 6, 2024 8:10 PM'),
		visits: 5,
	},
	{
		userId: '4',
		name: 'Gorkem Cetin',
		lastViewedLink: 'Link #1284',
		lastActivity: new Date('July 1, 2024 4:30 AM'),
		visits: 3,
	},
];

const ContactsTable = () => {
	// Sorting state
	const [orderDirection, setOrderDirection] = useState<
		'asc' | 'desc' | undefined
	>(undefined);
	const [orderBy, setOrderBy] = useState<string | undefined>(undefined);

	// Handle sort request for the lastActivity column
	const handleSortRequest = () => {
		if (orderBy === undefined || orderDirection === undefined) {
			setOrderBy('lastActivity');
			setOrderDirection('asc');
		} else if (orderDirection === 'asc') {
			setOrderDirection('desc');
		} else {
			setOrderDirection(undefined);
			setOrderBy(undefined);
		}
	};

	// Memoized sorted rows
	const sortedRows = useMemo(() => {
		if (orderDirection === undefined) return rows;
		return rows.slice().sort((a, b) => {
			const timeA = a.lastActivity.getTime();
			const timeB = b.lastActivity.getTime();
			return orderDirection === 'asc' ? timeA - timeB : timeB - timeA;
		});
	}, [orderDirection]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="contacts table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ color: 'grey.600', fontWeight: 'bold' }}>
							NAME
						</TableCell>
						<TableCell sx={{ color: 'grey.600', fontWeight: 'bold' }}>
							LAST VIEWED LINK
						</TableCell>
						<TableCell sx={{ color: 'grey.600', fontWeight: 'bold' }}>
							<TableSortLabel
								active={orderBy === 'lastActivity'}
								direction={orderDirection}
								onClick={handleSortRequest}
								hideSortIcon={false}
								sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
								IconComponent={
									orderDirection === undefined
										? UnfoldMoreIcon
										: KeyboardArrowDownIcon
								}>
								LAST ACTIVITY
							</TableSortLabel>
						</TableCell>
						<TableCell sx={{ color: 'grey.600', fontWeight: 'bold' }}>
							VISITS
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedRows.map((row) => (
						<TableRowComponent key={row.userId} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ContactsTable;
