// Format a date string or Date object into a readable format
// Generic date formatting utility
export const formatDate = (
	date: string | Date,
	options: { includeTime?: boolean } = {},
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

export const mapRequestData  = (source: Record<string, any>, fields: string[]): Record<string, any> => {
	return fields.reduce((acc: Record<string, any>, field) => {
		if (field in source) {
			acc[field] = source[field];
		}

		return acc;
	}, {});
}
