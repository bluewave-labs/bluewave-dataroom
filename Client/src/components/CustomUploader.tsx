// src/components/CustomUploader.tsx
import { useFileInfoStore } from '@/store/useFileInfoStore';
import { Button, TextField, Box } from '@mui/material';
import { useToast } from '@/hooks/useToast';
import { a11yDark } from '@react-email/components';
interface CustomUploaderProps {
	variant: 'inProgress' | 'completed' | 'failed';
	maxFileSize?: string;
	fileFormats?: string;
	progress: number;
	handleProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomUploader({ fileFormats }: CustomUploaderProps) {
	const { fileInfo, setFileInfo, file, setFile } = useFileInfoStore();
	const { showToast } = useToast();

	// Handle file selection and store it in Zustand
	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files && files.length > 0) {
			const selectedFile = files[0];

			if (selectedFile) {
				// Format file size
				const formattedFileSize = (selectedFile.size / 1024).toFixed(2) + ' KB';
				const fileInfo = {
					name: selectedFile.name,
					size: formattedFileSize,
					type: selectedFile.type,
				};

				// Store file info and the actual file object in Zustand store
				setFileInfo(fileInfo);
				setFile(selectedFile);
				if (selectedFile.size > 1 * 1024 * 1024) {
					showToast({
						message: 'Cannot upload file larger than 1 MB',
						variant: 'error',
					});
				}
			}
		}
	};

	return (
		<Box display='flex'>
			<TextField
				value={fileInfo.name}
				size='small'
				fullWidth
				disabled
			/>
			<Button
				variant='outlined'
				color='inherit'
				size='small'
				sx={{ borderColor: 'text.notes', ml: 10, fontSize: 13, minWidth: '6rem' }}
				onClick={() => document.getElementById('file-input')?.click()}>
				Browse
			</Button>
			<input
				type='file'
				id='file-input'
				accept={fileFormats === 'JPG, PNG' ? 'image/*' : 'application/pdf'}
				style={{ display: 'none' }}
				onChange={handleFileSelect}
			/>
		</Box>
	);
}
