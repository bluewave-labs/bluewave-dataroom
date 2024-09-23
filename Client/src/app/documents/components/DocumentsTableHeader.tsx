import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Document } from './DocumentsTable'; // Adjust the import path as necessary

interface Props {
	orderBy: keyof Document | undefined;
	orderDirection: 'asc' | 'desc' | undefined;
	onSort: (property: keyof Document) => void;
}

export const DocumentsTableHeader = ({
	orderBy,
	orderDirection,
	onSort,
}: Props) => (
	<TableRow>
		<TableCell sx={{ width: '5%' }}></TableCell>
		<TableCell
			sx={{
				color: 'rgba(161, 175, 198)',
				width: '45%',
			}}>
			DOCUMENT
		</TableCell>
		<TableCell
			sx={{
				color: 'rgba(161, 175, 198)',
				paddingLeft: '1.5rem',
				width: '25%',
			}}>
			<TableSortLabel
				active={orderBy === 'uploader'}
				direction={orderDirection}
				onClick={() => onSort('uploader')}
				hideSortIcon={false}
				sx={{ '& .MuiTableSortLabel-icon': { opacity: 1 } }}
				IconComponent={
					orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon
				}>
				UPLOADER
			</TableSortLabel>
		</TableCell>
		<TableCell
			sx={{
				color: 'rgba(161, 175, 198)',
				paddingLeft: '1.5rem',
				width: '15%',
			}}>
			ANALYTICS
		</TableCell>
		<TableCell sx={{ color: 'rgba(161, 175, 198)', width: '10%' }}>
			ACTION
		</TableCell>
	</TableRow>
);
