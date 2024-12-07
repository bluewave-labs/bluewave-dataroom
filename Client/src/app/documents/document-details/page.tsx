import { Container } from '@mui/material';
import DocumentDetailsClient from './components/DocumentDetailsClient';

export default function DocumentDetailsPage() {
	return (
		<Container sx={{ pb: 15 }}>
			<DocumentDetailsClient />
		</Container>
	);
}
