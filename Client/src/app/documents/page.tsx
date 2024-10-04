import {
	Box,
	Button,
	Container,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function DocumentsPage() {
	const documentCount: number = 0;
	const isEmptyState = documentCount === 0;

	return (
		<Container
			maxWidth="lg"
			sx={{
				paddingTop: '2rem',
				paddingBottom: '4rem',
				backgroundImage: 'url(/doc-background.svg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: isEmptyState ? 'center' : 'flex-start',
				alignItems: 'center',
			}}>
			{/* Empty Section */}
			{isEmptyState ? (
				<Box
					display="flex"
					flexDirection="column"
					alignContent="center"
					textAlign="center"
					width="100%">
					<Typography variant="h5" sx={{ fontWeight: 'bold', mb: '1rem' }}>
						Welcome to BlueWave DataRoom
					</Typography>
					<List
						sx={{
							textAlign: 'left',
							mb: '3rem',
							maxWidth: '100%',
							marginX: 'auto',
						}}>
						<ListItem>
							<ListItemIcon>
								<CheckCircleOutlineOutlinedIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary="Securely share files and manage permissions" />
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<CheckCircleOutlineOutlinedIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary="Keep your users updated with the latest documents" />
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<CheckCircleOutlineOutlinedIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary="Build trust with a professional user interface" />
						</ListItem>
					</List>
					<DragAndDropBox text="Drag and drop your first document here" />
				</Box>
			) : (
				<>
					{/* Header Section */}
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb="2rem"
						textTransform="none"
						width="100%">
						<Box>
							<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
								Manage your documents
							</Typography>
							<Typography variant="caption" color="text.secondary">
								{documentCount} documents
							</Typography>
						</Box>
						<Button
							variant="contained"
							color="primary"
							size="small"
							sx={{ padding: '0.4rem 1rem', textTransform: 'none' }}>
							Upload new document
						</Button>
					</Box>
					{/* Drag-and-Drop Section */}
					<Box marginBottom="3rem" width="100%">
						<DragAndDropBox text="Drag and drop your document here or click to upload" />
					</Box>

					{/* Documents Table Section */}
					<DocumentsTable />
				</>
			)}
		</Container>
	);
}

