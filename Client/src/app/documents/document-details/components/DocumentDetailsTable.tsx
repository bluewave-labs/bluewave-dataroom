import DocumentDetailsTableHeader from './DocumentDetailsTableHeader';
import DocumentDetailsTableRow from './DocumentDetailsTableRow';
import { dummyData } from '@/data/dummyDocuments';
import { useSort } from '@/hooks/useSort';
import { useState } from 'react';
import {
	Table,
	TableContainer,
	TableHead,
	TableBody,
	Paper,
	TableCell,
	Link,
	Button,
	TableRow,
} from '@mui/material';

export interface LinkDetail {
	id: number;
	createdLink: string;
	lastViewed: Date;
	linkViews: number;
}

export interface VisitorDetail {
	id: number;
	visitor: string;
	downloads: number;
	lastViewed: Date;
	duration: string;
	completion: string;
}

interface DocumentDetailsTableProps {
	variant?: 'linkTable' | 'visitorTable';
}

export default function DocumentDetailsTable({ variant }: DocumentDetailsTableProps) {
	const [showScroll, setShowScroll] = useState(false);
	const [pageSize, setPageSize] = useState(4);
	const page = 1;

	const data =
		variant === 'linkTable'
			? (dummyData[0]?.createdLinks ?? []) // Fallback to empty array if undefined
			: (dummyData[0]?.visitors ?? []); // Fallback to empty array if undefined

	// Sort the entire data set
	const { sortedData, orderDirection, orderBy, handleSortRequest } = useSort<
		LinkDetail | VisitorDetail
	>(
		data,
		undefined,
		(
			a: LinkDetail | VisitorDetail,
			b: LinkDetail | VisitorDetail,
			orderDirection: 'asc' | 'desc' | undefined
		): number => {
			const timeA = a.lastViewed.getTime();
			const timeB = b.lastViewed.getTime();
			return orderDirection === 'asc' ? timeA - timeB : timeB - timeA;
		}
	);

	// Paginate the sorted data
	const totalPages = Math.ceil(sortedData.length / pageSize);
	const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

	//click on the Load more section
	const handleLoadMoreClick = () => {
		setPageSize(sortedData.length);
		setShowScroll(true);
	};

	return (
		<TableContainer
			component={Paper}
			sx={{
				...(showScroll && {
					maxHeight: 300,
					overflowY: 'auto',
				}),
			}}>
			<Table aria-label="documents table" stickyHeader>
				<TableHead>
					<DocumentDetailsTableHeader
						variant={variant}
						orderBy={orderBy}
						orderDirection={orderDirection}
						onSort={handleSortRequest}
					/>
				</TableHead>
				<TableBody>
					{paginatedData?.map((documentDetail) => (
						<DocumentDetailsTableRow
							key={documentDetail.id}
							documentDetail={documentDetail}
							variant={variant}
						/>
					))}
					{variant === 'linkTable' && paginatedData?.length === 0 && (
						<TableRow>
							<TableCell colSpan={4} sx={{ width: '100%', textAlign: 'center' }}>
								<Button variant="contained" sx={{ px: 70 }}>
									Create a link
								</Button>
							</TableCell>
						</TableRow>
					)}
					{totalPages > 1 && (
						<TableRow>
							<TableCell
								colSpan={variant === 'visitorTable' ? 5 : 4}
								sx={{ width: '100%', textAlign: 'center' }}>
								<Link
									underline="hover"
									sx={{ px: 4, color: 'text.secondary', cursor: 'pointer' }}
									onClick={handleLoadMoreClick}>
									Load more...
								</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
