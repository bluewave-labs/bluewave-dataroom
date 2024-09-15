import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Stack spacing={4} maxWidth="lg" sx={{ pb: '15rem', pt: '4rem' }}>
			<Box>
				<Link href="/" passHref>
					<Button
						color="secondary"
						variant="outlined"
						size="small"
						sx={{ paddingX: '1.2rem', paddingY: '0.1rem' }}
						startIcon={<ArrowBackIcon />}>
						Back
					</Button>
				</Link>
			</Box>
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
