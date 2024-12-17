'use client';
import Paginator from '@/components/Paginator';
import { useSort } from '@/hooks/useSort';
import { Document } from '@/utils/shared/models';
import {
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import DocumentsTableHeader from './DocumentsTableHeader';
import DocumentsTableRow from './DocumentsTableRow';

interface DocumentsTableProps {
	documents: Document[];
	loading: boolean;
	error: string | null;
	handleDocumentDelete: (documentId: number) => void;
}

const DocumentsTable = (props: DocumentsTableProps) => {
	const { documents, loading, error, handleDocumentDelete } = props;

	const [page, setPage] = useState(1);
	const pageSize = 8;

	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Document>(documents);
	const totalPages = Math.ceil(sortedData.length / pageSize);

	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	if (loading) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight='50vh'>
				<Typography color='error'>{error}</Typography>
			</Box>
		);
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='space-between'
			minWidth='100%'
			flexGrow={1}>
			<TableContainer component={Paper}>
				<Table aria-label='documents table'>
					<TableHead>
						<DocumentsTableHeader
							orderBy={orderBy}
							orderDirection={orderDirection}
							onSort={handleSortRequest}
						/>
					</TableHead>
					<TableBody>
						{paginatedData.map((document) => (
							<DocumentsTableRow
								key={document.id}
								document={document}
								onDelete={handleDocumentDelete}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{totalPages > 1 && (
				<Box>
					<Paginator
						page={page}
						totalPages={totalPages}
						onPageChange={setPage}
						pageSize={pageSize}
						totalItems={sortedData.length}
					/>
				</Box>
			)}
		</Box>
	);
};

export default DocumentsTable;
