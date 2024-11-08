import { useToast } from '@/hooks/useToast';
import { FormEvent, useState } from 'react';

interface UseAuthFormProps {
	onSubmit: () => Promise<void>;
	isServerError?: (error: any) => boolean;
}

export const useAuthForm = ({ onSubmit, isServerError }: UseAuthFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const toast = useToast();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			await onSubmit();
		} catch (err: any) {
			const serverError = err.response?.data?.message || 'An unexpected error occurred.';
			setError(serverError);

			// Only show toast if the error is confirmed to be a server error
			if (isServerError && isServerError(err)) {
				toast.showToast();
			}
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, handleSubmit, toast };
};
