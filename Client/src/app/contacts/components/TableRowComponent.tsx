import { TableCell, TableRow } from '@mui/material';

interface RowData {
	userId: string;
	name: string;
	lastViewedLink: string;
	lastActivity: Date;
	visits: number;
}

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

const TableRowComponent = ({ row }: { row: RowData }) => (
	<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
		<TableCell component="th" scope="row">
			{row.name}
		</TableCell>
		<TableCell>{row.lastViewedLink}</TableCell>
		<TableCell>{formatDate(row.lastActivity)}</TableCell>
		<TableCell>{row.visits}</TableCell>
	</TableRow>
);

export default TableRowComponent;
