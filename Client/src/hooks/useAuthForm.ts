import { useToast } from '@/hooks/useToast';
import { FormEvent, useState } from 'react';

interface UseAuthFormProps {
	onSubmit: () => Promise<void>;
	onSuccess?: () => void;
	onError?: (error: string) => void;
	successMessage?: string;
	errorMessage?: string;
}

export const useAuthForm = ({
	onSubmit,
	onSuccess,
	onError,
	successMessage,
	errorMessage,
}: UseAuthFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const toast = useToast();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			await onSubmit();
			toast.showToast({
				message: successMessage,
				variant: 'success',
			});
			onSuccess?.();
		} catch (err: any) {
			const message =
				err?.response?.data?.message || err?.message || 'An unexpected error occurred.';
			setError(message);

			// If an errorMessage is provided, show that instead
			toast.showToast({
				message: `Error: ${errorMessage || message}`,
				variant: 'error',
			});

			onError?.(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		handleSubmit,
		toast,
	};
};
