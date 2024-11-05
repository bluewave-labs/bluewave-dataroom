import { useState } from 'react';

export const useToast = () => {
	const [open, setOpen] = useState(false);
	const showToast = () => setOpen(true);
	const hideToast = () => setOpen(false);

	return { showToast, hideToast, open };
};
