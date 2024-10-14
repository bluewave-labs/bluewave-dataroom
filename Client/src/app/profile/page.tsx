import { Box, Container } from '@mui/material';
import ProfileClient from './components/ProfileClient';

export default function ProfilePage() {
	return (
		<Box
			sx={{
				width: '100%',
				margin: '0 auto',
				minHeight: '80vh',
				paddingRight: '8rem',
			}}>
			<ProfileClient />
		</Box>
	);
}
