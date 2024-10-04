import { Pagination, Box, PaginationItem, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface PaginatorProps {
	page: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
	pageSize: number;
	totalItems: number;
}

const Paginator = ({
	page,
	totalPages,
	onPageChange,
	pageSize,
	totalItems,
}: PaginatorProps) => {
	const handlePageChange = (_event: any, newPage: number) => {
		onPageChange(newPage);
	};

	if (totalItems <= pageSize) {
		return null;
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			marginTop="2rem"
			gap="1rem">
			<Button
				variant="outlined"
				startIcon={<ArrowBackIcon />}
				onClick={() => onPageChange(page > 1 ? page - 1 : page)}
				disabled={page === 1}
				sx={{ minWidth: '8rem' }} // To make sure the button has enough space for the text
			>
				Previous
			</Button>

			<Pagination
				count={totalPages}
				page={page}
				size="large"
				onChange={handlePageChange}
				shape="rounded"
				color="primary"
				renderItem={(item) => (
					<PaginationItem
						{...item}
						sx={{ padding: '0 8px' }} // Ensure consistent spacing inside the numbers
					/>
				)}
			/>
			<Button
				variant="outlined"
				endIcon={<ArrowForwardIcon />}
				onClick={() => onPageChange(page < totalPages ? page + 1 : page)}
				disabled={page === totalPages}
				sx={{ minWidth: '8rem' }} // To make sure the button has enough space for the text
			>
				Next
			</Button>
		</Box>
	);
};

export default Paginator;
