'use client';

import Paginator from '@/components/Paginator';
import { dummyData } from '@/data/dummyDocuments';
import {
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
} from '@mui/material';
import { useEffect, useState } from 'react';
import DocumentsTableRow from './DocumentsTableRow';
import { DocumentsTableHeader } from './DocumentsTableHeader';
import { useSort } from '@/hooks/useSort';

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

	const { sortedData, orderDirection, orderBy, handleSortRequest } =
		useSort<Document>(dummyData);

	const totalPages = Math.ceil(sortedData.length / pageSize);

	const paginatedData = sortedData.slice(
		(page - 1) * pageSize,
		page * pageSize
	);

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="documents table">
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

export default DocumentsTable;
