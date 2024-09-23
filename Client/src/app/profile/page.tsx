import { Box, Container } from '@mui/material';
import ProfileClient from './components/ProfileClient';

export default function ProfilePage() {
	return (
		<Container maxWidth="lg" sx={{ pb: '15rem', pt: '4rem' }}>
			<Box sx={{ width: '100%', margin: '0 auto' }}>
				<ProfileClient />
			</Box>
		</Container>
	);
}
