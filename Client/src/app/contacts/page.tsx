import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Stack spacing={4} maxWidth="lg" sx={{ pb: '15rem', pt: '4rem' }}>
			<Box>
				<Typography
					sx={{
						fontWeight: '600',
						fontSize: '16px',
						marginBottom: '1rem',
					}}>
					All contacts
				</Typography>
				<ContactsTable />
			</Box>
		</Stack>
	);
}
