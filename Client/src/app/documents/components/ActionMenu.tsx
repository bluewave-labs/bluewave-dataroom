import { Menu, MenuItem, Typography } from '@mui/material';

interface Props {
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
}

const ActionsMenu = ({ anchorEl, open, onClose }: Props) => {
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			disableScrollLock={true}
			sx={{
				'& .MuiPaper-root': {
					boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
					borderRadius: '4px',
				},
			}}>
			<MenuItem onClick={onClose}>Add new link</MenuItem>
			<MenuItem onClick={onClose}>Duplicate document</MenuItem>
			<MenuItem onClick={onClose}>Update document</MenuItem>
			<MenuItem onClick={onClose}>View analytics</MenuItem>
			<MenuItem onClick={onClose}>
				<Typography color="error">Delete</Typography>
			</MenuItem>
		</Menu>
	);
};

export default ActionsMenu;
