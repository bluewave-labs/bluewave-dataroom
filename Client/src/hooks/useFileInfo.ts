export default function useFileInfo() {
	// Convert a size in bytes to a human-readable size string (e.g., "5 MB").
	const formatFileSize = (sizeInBytes: number): string => {
		if (sizeInBytes < 1024) {
			return `${sizeInBytes} Bytes`;
		} else if (sizeInBytes < 1024 * 1024) {
			return `${(sizeInBytes / 1024).toFixed(2)} KB`;
		} else if (sizeInBytes < 1024 * 1024 * 1024) {
			return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
		} else {
			return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
		}
	};

	// Convert a human-readable size string (e.g., "20 KB") to its size in bytes.
	const parseFileSize = (sizeInString: string): number => {
		// Regular expression to extract the numeric value and the unit

		const regex = /([\d.]+)\s*(KB|MB|GB)/i;
		const match = sizeInString.match(regex);

		if (!match) {
			throw new Error('Invalid file size format');
		}

		const value = parseFloat(match[1]); // Extract the numeric value
		const unit = match[2].toUpperCase(); // Extract and normalize the unit

		// Convert based on the unit
		switch (unit) {
			case 'KB':
				return value * 1024;
			case 'MB':
				return value * 1024 * 1024;
			case 'GB':
				return value * 1024 * 1024 * 1024;
			default:
				throw new Error('Unknown unit');
		}
	};

	return { formatFileSize, parseFileSize };
}
