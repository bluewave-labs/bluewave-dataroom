import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
	IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';
import { FC, useState } from 'react';
import DeleteIcon from '../../public/assets/icons/teamPage/trash-icon.svg';
import Dropdown from './Dropdown';
import CustomUploader from './CustomUploader';
import CustomCircularProgress from './CustomCircularProgress';
import { FileTypeConfig } from '@/utils/shared/models';
import useFileInfo from '@/hooks/useFileInfo';

interface ModalVariant {
	color: 'primary' | 'error';
	ContentComponent: FC<{
		variant: 'inProgress' | 'completed' | 'failed';
		maxFileSize?: string;
		fileFormats?: string;
		fileInfo: { name: string; size: string; type: string };
		handleFileInfo: React.Dispatch<
			React.SetStateAction<{ name: string; size: string; type: string }>
		>;
		progress: number;
		handleProgress: React.Dispatch<React.SetStateAction<number>>;
	}>;
}

const modalVariants: { [key in 'upload' | 'delete' | 'invite']: ModalVariant } = {
	upload: {
		color: 'primary',
		ContentComponent: UploadBox,
	},
	delete: {
		color: 'error',
		ContentComponent: () => null,
	},
	invite: {
		color: 'primary',
		ContentComponent: InviteBox,
	},
};

// Define the state type
interface FileInfoType {
	name: string;
	size: string;
	type: string;
}

interface ModalWrapperProps {
	variant: 'upload' | 'delete' | 'invite';
	dialogContentVariant?: 'subtitle2' | 'body2';
	title: string;
	description?: string;
	confirmButtonText: string;
	cancelButtonText?: string;
	open: boolean;
	toggleModal: () => void;
	onClose: () => void;
	maxFileSize?: string;
	fileFormats?: string;
}

export default function ModalWrapper({
	variant,
	dialogContentVariant = 'subtitle2',
	title,
	description,
	confirmButtonText,
	cancelButtonText = 'Cancel',
	open,
	onClose,
	toggleModal,
	maxFileSize = '1 MB',
	fileFormats = 'PDF',
}: ModalWrapperProps) {
	const [progress, setProgress] = useState(10);
	const [fileInfo, setFileInfo] = useState<FileInfoType>({
		name: '',
		size: '',
		type: '',
	});

	const { color, ContentComponent } = modalVariants[variant];
	const { parseFileSize } = useFileInfo();

	//Convert a human-readable size string (e.g., "20 KB") to its size in bytes.
	const fileSizeInBytes = fileInfo.size ? parseFileSize(fileInfo.size) : 0;
	const maxFileSizeInBytes = parseFileSize(maxFileSize);

	const handleConfirm = () => {
		toggleModal(), onClose();
	};

	const handleCancel = () => {
		toggleModal();
		if (variant === 'upload') {
			setFileInfo((prevFileInfo) => ({
				...prevFileInfo,
				name: '',
				size: '',
				type: '',
			}));
		}
	};

	return (
		<Dialog
			open={open}
			sx={
				variant === 'upload'
					? {
							'& .MuiPaper-root': {
								width: 475,
								maxWidth: 'none',
							},
						}
					: undefined
			}>
			<DialogTitle variant='h2'>{title}</DialogTitle>
			<DialogContent>
				{description && (
					<DialogContentText mb={4}>
						<Typography variant={dialogContentVariant}>{description}</Typography>
					</DialogContentText>
				)}
				<ContentComponent
					variant={
						fileSizeInBytes > maxFileSizeInBytes
							? 'failed'
							: progress >= 100
								? 'completed'
								: 'inProgress'
					}
					maxFileSize={maxFileSize}
					fileFormats={fileFormats}
					fileInfo={fileInfo}
					handleFileInfo={setFileInfo}
					progress={progress}
					handleProgress={setProgress}
				/>
			</DialogContent>
			<DialogActions sx={{ mr: 8, mb: 7 }}>
				<Button
					variant='text'
					color='secondary'
					onClick={handleCancel}>
					{cancelButtonText}
				</Button>
				<Button
					disabled={variant === 'upload' && !fileInfo.name}
					variant='contained'
					color={color}
					onClick={handleConfirm}>
					{confirmButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

interface UploadBoxProps {
	variant: 'inProgress' | 'completed' | 'failed';
	maxFileSize?: string;
	fileFormats?: string;
	fileInfo: { name: string; size: string; type: string };
	handleFileInfo: React.Dispatch<
		React.SetStateAction<{ name: string; size: string; type: string }>
	>;
	progress: number;
	handleProgress: React.Dispatch<React.SetStateAction<number>>;
}

// Separate component for the Upload Box
function UploadBox({
	variant,
	maxFileSize,
	fileFormats,
	fileInfo,
	handleFileInfo,
	progress,
	handleProgress,
}: UploadBoxProps) {
	//Check the file type
	const iconSrc =
		fileInfo.type in FileTypeConfig
			? FileTypeConfig[fileInfo.type as keyof typeof FileTypeConfig]
			: FileTypeConfig['General'];

	return (
		<Box mt={12}>
			<Box mb={3}>
				<CustomUploader
					fileFormats={fileFormats}
					fileInfo={fileInfo}
					handleFileInfo={handleFileInfo}
				/>
			</Box>
			<Box mb={11}>
				<Typography
					variant='body2'
					color='text.secondary'>
					Supported formats: {fileFormats} | Max file size: {maxFileSize} each.
				</Typography>
			</Box>
			{fileInfo.name && (
				<Grid
					container
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					alignItems='center'
					border={1}
					borderRadius={4}
					borderColor='text.notes'
					minHeight='7.5vh'
					mb={5}>
					<Grid
						size={2}
						display='flex'
						justifyContent='center'>
						<Box
							component='img'
							src={iconSrc}
							alt={`${fileInfo.type} icon`}
							sx={{ width: 35, height: 35 }}
						/>
					</Grid>
					<Grid size={variant === 'failed' ? 7 : 8}>
						<Typography
							variant='body1'
							color={variant === 'failed' ? 'error' : undefined}>
							{fileInfo.name}
						</Typography>
						<Typography
							variant='body2'
							color={variant === 'failed' ? 'error' : undefined}>
							{fileInfo.size}
						</Typography>
					</Grid>
					<Grid size={variant === 'failed' ? 3 : 2}>
						{variant === 'inProgress' && (
							<CustomCircularProgress
								fileInfo={fileInfo}
								progress={progress}
								handleProgress={handleProgress}
							/>
						)}
						{variant === 'completed' && (
							<IconButton>
								<Image
									width={18}
									height={20}
									src={DeleteIcon}
									alt='Delete icon'
								/>
							</IconButton>
						)}
						{variant === 'failed' && (
							<Typography
								variant='body2'
								color={variant === 'failed' ? 'error' : undefined}>
								Upload Failed
							</Typography>
						)}
					</Grid>
				</Grid>
			)}
		</Box>
	);
}

// Separate component for the Invite Box
function InviteBox() {
	const [email, setEmail] = useState('');

	return (
		<Box
			component='form'
			autoComplete='off'
			mt={13}>
			<Grid>
				<TextField
					variant='outlined'
					placeholder='Email'
					size='small'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					sx={{
						'& .MuiInputBase-input::placeholder': { color: '#667085', opacity: 1 },
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderRadius: 2,
							},
						},
					}}
				/>
			</Grid>
			<Grid mt={15}>
				<Dropdown
					initialValue='Select role'
					variant='outlined'
					isSelectFullWidth={true}
					options={[
						{ value: 'Select role', label: 'Select role' },
						{ value: 'Administrator', label: 'Administrator' },
						{ value: 'Member', label: 'Member' },
					]}
					onValueChange={(newRole) => {
						console.log(`${newRole} is selected`);
					}}
				/>
			</Grid>
		</Box>
	);
}
