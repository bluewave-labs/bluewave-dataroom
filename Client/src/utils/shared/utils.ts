// Format a date string or Date object into a readable format
// Generic date formatting utility
export const formatDate = (
	date: string | Date,
	options: { includeTime?: boolean; } = {},
): string => {
	const parsedDate = typeof date === 'string' ? new Date(date) : date;

	// Format date part
	const datePart = parsedDate.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	// Format time part if requested
	if (options.includeTime) {
		const timePart = parsedDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		return `${datePart} ${timePart}`;
	}

	return datePart;
};

export const formatBytes = (bytes = 0): string => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Bytes';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	const value = (bytes / Math.pow(1024, i)).toFixed(2);

	return `${value} ${sizes[i]}`;
};
