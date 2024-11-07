import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

interface UseAuthFormProps {
	onSubmit: () => Promise<void>;
}

export const useAuthForm = ({ onSubmit }: UseAuthFormProps) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const toast = useToast();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			await onSubmit();
		} catch (err) {
			setError('An unexpected error occurred.');
			toast.showToast();
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, handleSubmit, toast };
};
