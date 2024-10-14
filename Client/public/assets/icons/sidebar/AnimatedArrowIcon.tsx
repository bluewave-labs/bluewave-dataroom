import { Box, styled } from '@mui/material';

const ArrowContainer = styled(Box)(({ theme }) => ({
	width: '1rem',
	height: '1rem',
	display: 'inline-block',
	position: 'relative',
	cursor: 'pointer',
}));

const ArrowLine = styled(Box)(({ open }: { open: boolean }) => ({
	position: 'absolute',
	width: '0.6rem',
	height: '0.1rem',
	backgroundColor: '#667085',
	transition: 'all 0.3s ease',
	'&:first-of-type': {
		right: 0,
		top: '0.5rem',
		transform: open ? 'rotate(-45deg)' : 'rotate(45deg)',
	},
	'&:last-of-type': {
		left: 0,
		top: '0.5rem',
		transform: open ? 'rotate(45deg)' : 'rotate(-45deg)',
	},
}));

const Arrow = ({ open }: { open: boolean }) => {
	return (
		<ArrowContainer>
			<ArrowLine open={open} />
			<ArrowLine open={open} />
		</ArrowContainer>
	);
};

export default Arrow;
