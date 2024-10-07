import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import {
	Avatar,
	Box,
	Chip,
	IconButton,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import ActionMenu from './ActionMenu';
import { Document } from './DocumentsTable';

const docTypeIcons: Record<Document['type'], string> = {
	PDF: '/assets/icons/documentPage/pdf-icon.svg',
	DOC: '/assets/icons/documentPage/word-icon.svg',
	XLSX: '/assets/icons/documentPage/xlsx-icon.svg',
	PPT: '/assets/icons/documentPage/ppt-icon.svg',
};

interface Props {
	document: Document;
}

const DocumentsTableRow = ({ document }: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<TableRow hover>
			<TableCell sx={{ paddingRight: 0 }}>
				<Box
					component="img"
					src={docTypeIcons[document.type]}
					alt={`${document.type} icon`}
					sx={{ width: '24px', height: '24px' }}
				/>
			</TableCell>
			<TableCell>
				<Box display="flex" alignItems="center">
					<Box>
						<Typography variant="body2">{document.name}</Typography>
						<Typography variant="caption" sx={{ color: 'blue' }}>
							{document.createdAt.toDateString()} • {document.links} links •{' '}
							{document.viewers} viewers
						</Typography>
					</Box>
				</Box>
			</TableCell>
			<TableCell>
				<Box display="flex" alignItems="center">
					<Avatar
						src={document.uploader.avatar}
						alt={document.uploader.name}
						sx={{ width: 24, height: 24, marginRight: 1 }}
					/>
					<Typography variant="body2">{document.uploader.name}</Typography>
				</Box>
			</TableCell>
			<TableCell>
				<Chip
					icon={<BarChartIcon color="action" />}
					label={`${document.views} views`}
					size="small"
					color="secondary"
					sx={{
						borderRadius: '4px',
						width: '6rem',
						display: 'flex',
						justifyContent: 'flex-start',
					}}
				/>
			</TableCell>
			<TableCell sx={{ paddingLeft: '1.5rem' }}>
				<IconButton onClick={handleMenuOpen}>
					<SettingsIcon fontSize="small" />
				</IconButton>
				<ActionMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
			</TableCell>
		</TableRow>
	);
};

export default DocumentsTableRow;
