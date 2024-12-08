import { Document, FileTypeConfig } from '@/utils/shared/models';
import { formatDate } from '@/utils/shared/utils';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Avatar, Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import SettingsIcon from '../../../../public/assets/icons/sidebar/SettingsIcon';
import ActionMenu from './ActionMenu';

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
			<TableCell sx={{ paddingRight: 0, textAlign: 'center' }}>
				<Box
					component='img'
					src={FileTypeConfig[document.fileType] || FileTypeConfig['General']}
					alt={`${document.fileType} icon`}
					sx={{ width: 24, height: 24 }}
				/>
			</TableCell>
			<TableCell>
				<Box
					display='flex'
					alignItems='center'>
					<Box>
						{document.fileName}
						<br />
						<Typography
							variant='caption'
							component='div'
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
							}}>
							<span>{formatDate(document.createdAt)}</span>
							<span style={{ fontSize: 13 }}>•</span>
							<span>{document.links} links</span>
							<span style={{ fontSize: 13 }}>•</span>
							<span>{document.viewers} viewers</span>
						</Typography>
					</Box>
				</Box>
			</TableCell>
			<TableCell>
				<Box
					display='flex'
					alignItems='center'>
					{document.uploader.avatar ? (
						<Avatar
							src={document.uploader.avatar}
							alt={document.uploader.name}
							sx={{ width: 24, height: 24, marginRight: 5 }}
						/>
					) : (
						<Avatar
							alt={document.uploader.name}
							sx={{ width: 24, height: 24, marginRight: 5 }}>
							{document.uploader.name.charAt(0).toUpperCase()}
						</Avatar>
					)}
					{document.uploader.name}
				</Box>
			</TableCell>

			<TableCell>
				<Chip
					icon={<BarChartIcon />}
					label={`${document.views} views`}
					size='small'
					color='secondary'
					sx={{
						width: '5.5rem',
					}}
				/>
			</TableCell>
			<TableCell sx={{ paddingLeft: '1.5rem' }}>
				<IconButton onClick={handleMenuOpen}>
					<SettingsIcon
						width={20}
						height={20}
					/>
				</IconButton>
				<ActionMenu
					anchorEl={anchorEl}
					open={open}
					onClose={handleMenuClose}
				/>
			</TableCell>
		</TableRow>
	);
};

export default DocumentsTableRow;
