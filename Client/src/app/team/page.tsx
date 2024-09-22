import { Container, Divider, Typography } from '@mui/material';
import OrganizationName from './components/OrganizationName';
import TeamClient from './components/TeamClient';

export default function TeamPage() {
	return (
		<Container maxWidth="lg" sx={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
			<Typography variant="h5" sx={{ color: 'primary.main' }}>
				Team
			</Typography>
			<Divider sx={{ marginBottom: '1rem' }} />
			<Typography
				variant="body2"
				sx={{ color: 'text.secondary', marginBottom: '4rem' }}>
				Set up your team here.
			</Typography>

			<OrganizationName />

			<Divider sx={{ marginY: '4rem' }} />
			<Typography
				sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '2rem' }}>
				Team Members
			</Typography>

			<TeamClient />
		</Container>
	);
}
