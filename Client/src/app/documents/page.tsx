import { Box, Button, Container, Typography } from '@mui/material';
import DocumentsTable from './components/DocumentsTable';
import DragAndDropBox from './components/DragAndDropBox';

export default function DocumentsPage() {
	const documentCount = 3; // Dynamically fetch or calculate based on your documents data

	return (
		<Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
			{/* Header Section */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				marginBottom="2rem">
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
					sx={{ padding: '0.5rem 2rem' }}>
					Upload new document
				</Button>
			</Box>

			{/* Drag-and-Drop Section */}
			<Box marginBottom="3rem">
				<DragAndDropBox text="Drag and drop your document here or click to upload" />
			</Box>

			{/* Documents Table Section */}
			<DocumentsTable />
		</Container>
	);
}
