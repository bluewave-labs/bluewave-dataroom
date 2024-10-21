import { Container, Divider, Typography } from '@mui/material';
import OrganizationName from './components/OrganizationName';
import TeamClient from './components/TeamClient';

export default function TeamPage() {
	return (
		<Container>
			<Typography variant="h1">Team</Typography>
			<Divider sx={{ marginBottom: '1rem' }} />
			<Typography variant="body1" sx={{ marginBottom: '4rem' }}>
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
