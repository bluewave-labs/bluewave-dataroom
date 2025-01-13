import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { TableCell, TableRow, TableSortLabel } from '@mui/material';

import { LinkDetail, VisitorDetail } from '@/utils/shared/models';

type SortableKeys = 'lastViewed';

interface InfoTableHeaderProps {
	variant?: 'linkTable' | 'visitorTable';
	orderBy?: keyof LinkDetail | VisitorDetail | undefined;
	orderDirection?: 'asc' | 'desc' | undefined;
	onSort?: (property: SortableKeys) => void;
}

/**
 * InfoTableHeader - Renders the table header row(s)
 * depending on link or visitor variant.
 */
export default function InfoTableHeader({
	variant,
	orderBy,
	orderDirection,
	onSort,
}: InfoTableHeaderProps) {
	const handleHeaderClick = () => {
		if (onSort) {
			onSort('lastViewed');
		}
	};

	const sortIcon = orderDirection === undefined ? UnfoldMoreIcon : KeyboardArrowDownIcon;

	if (variant === 'linkTable') {
		return (
			<TableRow>
				<TableCell sx={{ width: '45%', pl: 20 }}>LINK</TableCell>
				<TableCell sx={{ width: '20%', textAlign: 'center' }}>
					<TableSortLabel
						active={orderBy === 'lastViewed'}
						direction={orderDirection}
						onClick={handleHeaderClick}
						hideSortIcon={false}
						IconComponent={sortIcon}>
						LAST VIEWED
					</TableSortLabel>
				</TableCell>
				<TableCell sx={{ width: '25%', textAlign: 'center' }}>VIEWS</TableCell>
				<TableCell sx={{ width: '10%', textAlign: 'center' }}>ACTION</TableCell>
			</TableRow>
		);
	}

	// visitorTable
	return (
		<TableRow>
			<TableCell sx={{ width: '30%', pl: 20 }}>VISITOR</TableCell>
			<TableCell sx={{ width: '25%', textAlign: 'center' }}>
				<TableSortLabel
					active={orderBy === 'lastViewed'}
					direction={orderDirection}
					onClick={handleHeaderClick}
					hideSortIcon={false}
					IconComponent={sortIcon}>
					LAST VIEWED
				</TableSortLabel>
			</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>DOWNLOADS</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>DURATION</TableCell>
			<TableCell sx={{ width: '15%', textAlign: 'center' }}>COMPLETION</TableCell>
		</TableRow>
	);
}
