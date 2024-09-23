import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Container, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ContactsTable from './components/ContactsTable';

export default function ContactsPage() {
	return (
		<Container maxWidth="lg" sx={{ pb: '15rem', pt: '2rem' }}>
			<Box marginBottom="4rem">
				<div role="presentation">
					<Breadcrumbs aria-label="breadcrumb">
						<Link
							underline="hover"
							sx={{ display: 'flex', alignItems: 'center' }}
							color="inherit"
							href="/">
							<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
							Home
						</Link>
						<Typography
							sx={{
								color: 'text.primary',
								display: 'flex',
								alignItems: 'center',
							}}>
							<PersonOutlineIcon sx={{ mr: 0.5 }} fontSize="inherit" />
							Contacts
						</Typography>
					</Breadcrumbs>
				</div>
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
		</Container>
	);
}
