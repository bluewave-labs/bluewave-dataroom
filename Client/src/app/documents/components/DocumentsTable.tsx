'use client';
import Paginator from '@/components/Paginator';
import { dummyData } from '@/data/dummyDocuments';
import { useSort } from '@/hooks/useSort';
import { Box, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { useState } from 'react';
import DocumentsTableHeader from './DocumentsTableHeader';
import DocumentsTableRow from './DocumentsTableRow';

type DocumentType = 'PDF' | 'DOC' | 'XLSX' | 'PPT';

export interface Document {
	id: string;
	type: DocumentType;
	name: string;
	createdAt: Date;
	links: number;
	viewers: number;
	uploader: { name: string; avatar?: string };
	views: number;
}

const DocumentsTable = () => {
	const [page, setPage] = useState(1);
	const pageSize = 8;

	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<Document>(dummyData);

	const totalPages = Math.ceil(sortedData.length / pageSize);

	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
			minWidth="100%"
			flexGrow={1}>
			<TableContainer component={Paper}>
				<Table aria-label="documents table">
					<TableHead>
						<DocumentsTableHeader
							orderBy={orderBy}
							orderDirection={orderDirection}
							onSort={handleSortRequest}
						/>
					</TableHead>
					<TableBody>
						{paginatedData.map((document) => (
							<DocumentsTableRow key={document.id} document={document} />
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
						totalItems={dummyData.length}
					/>
				</Box>
			)}
		</Box>
	);
};

export default DocumentsTable;
