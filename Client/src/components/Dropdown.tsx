import { MenuItem, Select, SelectChangeEvent, StandardSelectProps } from '@mui/material';
import { useState } from 'react';

interface Props extends StandardSelectProps {
	options: { value: string; label: string }[];
	initialValue: string;
	onValueChange?: (newValue: string) => void;
}

const Dropdown = ({ options, initialValue, onValueChange, ...props }: Props) => {
	const [value, setValue] = useState<string>(initialValue);

	const handleChange = (event: SelectChangeEvent<unknown>) => {
		const newValue = event.target.value as string;
		setValue(newValue);

		if (onValueChange) {
			onValueChange(newValue);
		}
	};

	return (
		<Select
			value={value}
			onChange={handleChange}
			disableUnderline
			MenuProps={{
				disableScrollLock: true,
			}}
			sx={{
				minWidth: 195,
				'& .MuiSelect-select': { padding: '0.8rem 1rem' },
			}}
			{...props}>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</Select>
	);
};

export default Dropdown;
