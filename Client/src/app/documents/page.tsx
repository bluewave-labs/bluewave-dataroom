'use client';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
	Box,
	Container,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import axios from 'axios';
import { useState, useEffect, useTransition } from 'react';
import { Document } from '@/utils/shared/models';
import { useToast } from '@/hooks/useToast';

import PageLoader from '../loading';
import Background from '../../../public/assets/Background';
import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';


export default function DocumentsPage() {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();
	const { showToast } = useToast();

	const isEmptyState = !documents.length;

	useEffect(() => {
		const fetchDocuments = async () => {
			setLoading(true);
			startTransition(async () => {
				try {
					const response = await axios.get('/api/documents/list');
					setDocuments(response.data.documents || []);
				} catch (err) {
					setError('Failed to load documents. Please try again later.');
				} finally {
					setLoading(false);
				}
			});
		};

		fetchDocuments();
	}, []);

	const handleDocumentDelete = async (documentId: number) => {
		try {
			setLoading(true);
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
		} finally {
			setLoading(false);
		}
	};

	if (isPending) {
		return (<PageLoader />);
	}

	return (
		<Container
			sx={{
				height: '90%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: isEmptyState ? 'center' : 'flex-start',
				alignItems: 'center',
			}}>
			{/* Empty Section */}
			{isEmptyState ? (
				<>
					<Background backgroundPosition={0}></Background>
					<Box
						display='flex'
						flexDirection='column'
						alignContent='center'
						textAlign='center'
						width='100%'
						zIndex={1}>
						<Typography
							variant='h2'
							component='span'
							mb={10}>
							Welcome to BlueWave{' '}
							<Typography
								variant='h1'
								component='span'>
								DataRoom
							</Typography>
						</Typography>

						<List
							sx={{
								textAlign: 'left',
								mb: 3,
								maxWidth: '100%',
								marginX: 'auto',
							}}>
							<ListItem>
								<ListItemIcon>
									<CheckCircleOutlineOutlinedIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Securely share files and manage permissions' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleOutlineOutlinedIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Keep your users updated with the latest documents' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleOutlineOutlinedIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Build trust with a professional user interface' />
							</ListItem>
						</List>
						<DragAndDropBox
							text='Drag and drop your first document here or click to upload'
							setDocuments={setDocuments}
						/>
					</Box>
				</>
			) : (
				<>
					{/* Header Section */}
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						mb={5}
						textTransform='none'
						width='100%'>
						<Box>
							<Typography variant='h3'>Manage your documents</Typography>
							<Typography variant='body1'>{documents.length} Documents</Typography>
						</Box>
					</Box>
					{/* Drag-and-Drop Section */}
					<Box
						mb={5}
						width='100%'>
						<DragAndDropBox
							text='Drag and drop your document here or click to upload'
							setDocuments={setDocuments}
						/>
					</Box>

					{/* Documents Table Section */}
					<DocumentsTable
						loading={loading}
						error={error}
						documents={documents}
						handleDocumentDelete={handleDocumentDelete}
					/>
				</>
			)}
		</Container>
	);
}
