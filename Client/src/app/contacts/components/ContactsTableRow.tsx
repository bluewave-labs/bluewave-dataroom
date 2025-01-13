import { Contact } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';
import { TableCell, TableRow, Typography } from '@mui/material';

interface Props {
	contact: Contact;
}

const ContactsTableRow = ({ contact }: Props) => (
	<TableRow>
		<TableCell>
			{contact.name}
			<br />
			<Typography variant='caption'>{contact.email}</Typography>
		</TableCell>
		<TableCell>{contact.lastViewedLink}</TableCell>
		<TableCell>{formatDateTime(contact.lastActivity, { includeTime: true })}</TableCell>
		<TableCell>{contact.visits}</TableCell>
	</TableRow>
);

export default ContactsTableRow;
