import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { LinkDetail, VisitorDetail } from './DocumentDetailsTable';

type SortableKeys = 'id' | 'lastViewed';

interface DocumentDetailsTableHeaderProps {
	variant?: 'linkTable' | 'visitorTable';
	orderBy?: keyof LinkDetail | VisitorDetail | undefined;
	orderDirection?: 'asc' | 'desc' | undefined;
	onSort?: (property: SortableKeys) => void;
}

const DocumentDetailsTableHeader = ({
	variant,
	orderBy,
	orderDirection,
	onSort,
}: DocumentDetailsTableHeaderProps) => {
	return (
		<>
			{variant === 'linkTable' && (
				<TableRow>
					<TableCell sx={{ width: '45%', pl: 20 }}>LINK</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						<TableSortLabel
							active={orderBy === 'lastViewed'}
							direction={orderDirection}
							onClick={() => onSort?.('lastViewed')}
							hideSortIcon={false}
							IconComponent={orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon}>
							LAST VIEWED
						</TableSortLabel>
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>VIEWS</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>ACTION</TableCell>
				</TableRow>
			)}

			{variant === 'visitorTable' && (
				<TableRow>
					<TableCell sx={{ width: '25%', pl: 20 }}>VISITOR</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>DOWNLOADS</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						<TableSortLabel
							active={orderBy === 'lastViewed'}
							direction={orderDirection}
							onClick={() => onSort?.('lastViewed')}
							hideSortIcon={false}
							IconComponent={orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon}>
							LAST VIEWED
						</TableSortLabel>
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>DURATION</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>COMPLETION</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default DocumentDetailsTableHeader;
