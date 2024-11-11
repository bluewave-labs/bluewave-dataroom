import { Container } from '@mui/material';
import ProfileClient from './components/ProfileClient';

export default function ProfilePage() {
	return (
		<Container
			sx={{
				width: '100%',
				margin: '0 auto',
				minHeight: '80vh',
				paddingRight: '23rem',
			}}>
			<ProfileClient />
		</Container>
	);
}
