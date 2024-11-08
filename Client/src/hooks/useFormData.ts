import { useState, ChangeEvent } from 'react';

export const useFormData = (initialState: { [key: string]: any }) => {
	const [formData, setFormData] = useState(initialState);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value, checked, type } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: type === 'checkbox' ? checked : value,
		}));
	};

	return { formData, setFormData, handleChange };
};
