import {
	Body,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface BluewaveEmailProps {
	username?: string;
	setupUrl: string;
}

export const BluewaveEmail = ({ username = 'User', setupUrl }: BluewaveEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Bluewave Labs! Set up your account</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logo}>
						<Img
							src="https://utfs.io/f/fYAncjDxKRb0SB5lSuLK58qIuaP0cF3tMzrJCA4G92LHNofp"
							width={100}
							alt="Bluewave Labs"
						/>
					</Section>
					<Section style={content}>
						<Text style={paragraph}>Hello {username},</Text>
						<Text style={paragraph}>
							You have been invited to join Bluewave Labs! To complete your registration, please
							click the link below to set up your account.
						</Text>
						<Text style={paragraph}>
							<Link href={setupUrl} style={link}>
								{setupUrl}
							</Link>
						</Text>
						<Text style={paragraph}>
							If you did not expect this invitation, you can safely ignore this email.
						</Text>
						<Text style={paragraph}>Welcome aboard,</Text>
						<Text style={paragraph}>The Bluewave Labs Team</Text>
					</Section>
				</Container>

				<Section style={footer}>
					<Row>
						<Text style={{ textAlign: 'center', color: '#706a7b' }}>
							© 2024 Bluewave Labs, All Rights Reserved <br />
							123 Bluewave Drive, Suite 500, Toronto, CA
						</Text>
					</Row>
				</Section>
			</Body>
		</Html>
	);
};

export default BluewaveEmail;

// Styles
const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily,
};

const paragraph = {
	lineHeight: 1.5,
	fontSize: 16,
};

const container = {
	maxWidth: '580px',
	margin: '30px auto',
	backgroundColor: '#ffffff',
	padding: '45px',
};

const footer = {
	maxWidth: '580px',
	margin: '0 auto',
};

const content = {
	padding: '20px',
};

const logo = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 30,
};

const link = {
	textDecoration: 'underline',
};
