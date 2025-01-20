import { TableCell, TableRow, Typography } from '@mui/material';

import { Contact } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

interface Props {
	contact: Contact;
}

export default function ContactsTableRow({ contact }: Props) {
	return (
		<TableRow>
			<TableCell>
				{contact.name ? contact.name : 'N/A'}
				<br />
				<Typography variant='caption'>{contact.email ? contact.email : 'N/A'}</Typography>
			</TableCell>
			<TableCell>{contact.lastViewedLink}</TableCell>
			<TableCell>{formatDateTime(contact.lastActivity, { includeTime: true })}</TableCell>
			<TableCell>{contact.totalVisits}</TableCell>
		</TableRow>
	);
}
