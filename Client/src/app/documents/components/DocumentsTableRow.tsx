import BarChartIcon from '@mui/icons-material/BarChart';
import { Avatar, Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import SettingsIcon from '../../../../public/assets/icons/sidebar/SettingsIcon';
import ActionMenu from './ActionMenu';
import { Document } from './DocumentsTable';
import LinkIcon from '../../../../public/assets/icons/documentPage/LinkIcon';
import CheckIcon from '@mui/icons-material/Check';
import PDFIcon from '../../../../public/assets/icons/documentPage/PDFIcon';
import DOCIcon from '../../../../public/assets/icons/documentPage/DOCIcon';
import XLSXIcon from '../../../../public/assets/icons/documentPage/XLSXIcon';
import PPTIcon from '../../../../public/assets/icons/documentPage/PPTIcon';
import ZIPIcon from '../../../../public/assets/icons/documentPage/ZIPIcon';
import TXTIcon from '../../../../public/assets/icons/documentPage/TXTIcon';
import ImageIcon from '../../../../public/assets/icons/documentPage/ImageIcon';
import AudioIcon from '../../../../public/assets/icons/documentPage/AudioIcon';
import VideoIcon from '../../../../public/assets/icons/documentPage/VideoIcon';
import GeneralIcon from '../../../../public/assets/icons/documentPage/GeneralIcon';

const docTypeIcons: Record<Document['type'], ReactElement> = {
	PDF: <PDFIcon />,
	DOC: <DOCIcon />,
	XLSX: <XLSXIcon />,
	PPT: <PPTIcon />,
	ZIP: <ZIPIcon />,
	TXT: <TXTIcon />,
	Image: <ImageIcon />,
	Audio: <AudioIcon />,
	Video: <VideoIcon />,
	General: <GeneralIcon />,
};

interface Props {
	document: Document;
}

const DocumentsTableRow = ({ document }: Props) => {
	const [isLinkCopied, setIsLinkCopied] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const linkToCopy = document.createdLinks?.[0]?.createdLink;

	const handleLinkCopy = () => {
		if (linkToCopy) {
			navigator.clipboard.writeText(linkToCopy);
			setTimeout(() => {
				setIsLinkCopied(true);
			}, 300);
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<TableRow hover>
			<TableCell sx={{ pr: 0, textAlign: 'center' }}>{docTypeIcons[document.type]}</TableCell>
			<TableCell>
				<Box display="flex" alignItems="center">
					<Box>
						{document.name}
						<br />
						<Typography
							variant="caption"
							component="div"
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
				<Box display="flex" alignItems="center">
					{document.uploader.avatar ? (
						<Avatar
							src={document.uploader.avatar}
							alt={document.uploader.name}
							sx={{ width: 24, height: 24, marginRight: 5 }}
						/>
					) : (
						<Avatar alt={document.uploader.name} sx={{ width: 24, height: 24, marginRight: 5 }}>
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
					size="small"
					color="secondary"
					sx={{
						width: '5.5rem',
					}}
				/>
			</TableCell>
			<TableCell sx={{ pl: '1.5rem' }}>
				<IconButton disabled={document.createdLinks?.length === 0} onClick={handleLinkCopy}>
					{isLinkCopied ? (
						<CheckIcon fontSize="small" />
					) : (
						<LinkIcon disabled={document.createdLinks?.length === 0} />
					)}
				</IconButton>
			</TableCell>
			<TableCell sx={{ paddingLeft: '1.5rem' }}>
				<IconButton onClick={handleMenuOpen}>
					<SettingsIcon width={20} height={20} />
				</IconButton>
				<ActionMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
			</TableCell>
		</TableRow>
	);
};

export default DocumentsTableRow;
