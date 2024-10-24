import { Container, Typography } from '@mui/material';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Container>
			<Typography variant="h2" sx={{ marginBottom: 8 }}>
				All contacts
			</Typography>
			<ContactsTable />
		</Container>
	);
}
