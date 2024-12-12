'use client';
import Paginator from '@/components/Paginator';
import { useSort } from '@/hooks/useSort';
import { useToast } from '@/hooks/useToast';
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
import { useEffect, useState } from 'react';
import DocumentsTableHeader from './DocumentsTableHeader';
import DocumentsTableRow from './DocumentsTableRow';

const DocumentsTable = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { showToast } = useToast();

	const [page, setPage] = useState(1);
	const pageSize = 8;

	// Fetch data
	useEffect(() => {
		const fetchDocuments = async () => {
			setLoading(true);
			try {
				const response = await axios.get('/api/documents/list');
				setDocuments(response.data.documents || []);
			} catch (err) {
				setError('Failed to load documents. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchDocuments();
	}, []);

	const handleDocumentDelete = async (documentId: number) => {
		try {
<<<<<<< HEAD
			setLoading(true);
=======
>>>>>>> 7fcf743 (Restructure on handleDocumentDelete api call, moved to the parent comp)
			await axios.delete(`/api/documents/delete/${documentId}`);
			showToast({
				message: 'Document deleted successfully',
				variant: 'success',
			});
			setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.id !== documentId));
		} catch (error) {
			showToast({
				message: 'Error deleting document',
				variant: 'error',
			});
<<<<<<< HEAD
		} finally {
			setLoading(false);
=======
>>>>>>> 7fcf743 (Restructure on handleDocumentDelete api call, moved to the parent comp)
		}
	};

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
