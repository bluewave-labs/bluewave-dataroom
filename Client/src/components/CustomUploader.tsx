// src/components/CustomUploader.tsx
import { useFileInfoStore } from '@/store/useFileInfoStore';
import { Button, TextField, Box } from '@mui/material';
interface CustomUploaderProps {
	variant: 'inProgress' | 'completed' | 'failed';
	maxFileSize?: string;
	fileFormats?: string;
	progress: number;
	handleProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomUploader({ fileFormats }: CustomUploaderProps) {
	const { fileInfo, setFileInfo, file, setFile } = useFileInfoStore();

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
