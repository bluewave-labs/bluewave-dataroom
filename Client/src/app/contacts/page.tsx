import { Container, Typography } from '@mui/material';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Container>
			<Typography variant="h2" sx={{ marginBottom: '1rem' }}>
				All contacts
			</Typography>
			<ContactsTable />
		</Container>
	);
}
