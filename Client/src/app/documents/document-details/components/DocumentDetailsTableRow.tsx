import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '../../../../../public/assets/icons/teamPage/trash-icon.svg';
import CopyIcon from '../../../../../public/assets/icons/documentPage/CopyIcon';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import { LinkDetail, VisitorDetail } from './DocumentDetailsTable';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import ModalWrapper from '@/components/ModalWrapper';
import { formatDate } from '@/utils/shared/utils';

interface DocumentDetailsTableRowProps {
	variant?: 'linkTable' | 'visitorTable';
	documentDetail: LinkDetail | VisitorDetail;
}

const DocumentDetailsTableRow = ({ documentDetail, variant }: DocumentDetailsTableRowProps) => {
	const [isLinkCopied, setIsLinkCopied] = useState(false);

	const deleteModal = useModal();
	const { showToast } = useToast();

	//Delete the link
	const handleDeleteLink = () => {
		console.log('Link Deleted!');
		showToast({
			message: 'Link Deleted!',
			variant: 'error',
		});
	};

	//Extend the Type Guard for Link Table
	function isLinkDetail(documentDetail: LinkDetail | VisitorDetail): documentDetail is LinkDetail {
		return (documentDetail as LinkDetail).createdLink !== undefined;
	}

	//Extend the Type Guard for Visitor Table
	function isVisitorDetail(
		documentDetail: LinkDetail | VisitorDetail,
	): documentDetail is VisitorDetail {
		return (documentDetail as VisitorDetail).visitor !== undefined;
	}

	const linkToCopy =
		variant === 'linkTable' && isLinkDetail(documentDetail) && documentDetail.createdLink;

	//Copy the link
	const handleLinkCopy = () => {
		if (linkToCopy) {
			navigator.clipboard.writeText(linkToCopy);
			setTimeout(() => {
				setIsLinkCopied(true);
			}, 300);
		}
	};

	return (
		<>
			{variant === 'linkTable' && isLinkDetail(documentDetail) && (
				<TableRow hover>
					<TableCell sx={{ width: '45%', pl: 20, py: 11 }}>
						{documentDetail.createdLink}
						<IconButton
							sx={{ ml: 10 }}
							onClick={handleLinkCopy}>
							{isLinkCopied ? <CheckIcon fontSize='small' /> : <CopyIcon />}
						</IconButton>
					</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						{formatDate(documentDetail.lastViewed)}
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>
						{documentDetail.linkViews}
					</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						<IconButton onClick={deleteModal.openModal}>
							<Image
								width={15}
								height={17}
								src={DeleteIcon}
								alt='Delete icon'
							/>
						</IconButton>
					</TableCell>
				</TableRow>
			)}

			{variant === 'visitorTable' && isVisitorDetail(documentDetail) && (
				<TableRow hover>
					<TableCell sx={{ width: '25%', pl: 20, py: 11 }}>{documentDetail.visitor}</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						{documentDetail.downloads}
					</TableCell>
					<TableCell sx={{ width: '20%', textAlign: 'center' }}>
						{formatDate(documentDetail.lastViewed)}
					</TableCell>
					<TableCell sx={{ width: '25%', textAlign: 'center' }}>
						{documentDetail.duration}
					</TableCell>
					<TableCell sx={{ width: '10%', textAlign: 'center' }}>
						{documentDetail.completion}
					</TableCell>
				</TableRow>
			)}

			<ModalWrapper
				variant='delete'
				title='Really delete this link?'
				description='When you delete this link, all the links associated with the link will also be removed. This action is non-reversible.'
				confirmButtonText='Delete link'
				open={deleteModal.isOpen}
				onClose={handleDeleteLink}
				toggleModal={deleteModal.closeModal}
			/>
		</>
	);
};

export default DocumentDetailsTableRow;
