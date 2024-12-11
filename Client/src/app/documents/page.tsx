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
import prisma from '@lib/prisma';
import Background from '../../../public/assets/Background';
import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';
import { fetchDocumentCount } from '@/services/documentService';

export default async function DocumentsPage() {
	const documentCount = await fetchDocumentCount();
	const isEmptyState = documentCount === 0;

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
						<DragAndDropBox text='Drag and drop your first document here or click to upload' />
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
							<Typography variant='body1'>{documentCount} Documents</Typography>
						</Box>
					</Box>
					{/* Drag-and-Drop Section */}
					<Box
						mb={5}
						width='100%'>
						<DragAndDropBox text='Drag and drop your document here or click to upload' />
					</Box>

					{/* Documents Table Section */}
					<DocumentsTable />
				</>
			)}
		</Container>
	);
}
