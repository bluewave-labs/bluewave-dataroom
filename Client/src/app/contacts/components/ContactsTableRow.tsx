import { TableCell, TableRow, Typography } from '@mui/material';
import { Contact } from './ContactsTable';

const formatDate = (date: Date) => {
	const datePart = date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	const timePart = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	return `${datePart} ${timePart}`;
};

interface Props {
	contact: Contact;
}

const ContactsTableRow = ({ contact }: Props) => (
	<TableRow>
		<TableCell>
			{contact.name}
			<br />
			<Typography variant="caption">{contact.email}</Typography>
		</TableCell>
		<TableCell>{contact.lastViewedLink}</TableCell>
		<TableCell>{formatDate(contact.lastActivity)}</TableCell>
		<TableCell>{contact.visits}</TableCell>
	</TableRow>
);

export default ContactsTableRow;
