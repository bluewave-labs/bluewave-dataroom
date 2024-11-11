import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import { useState } from 'react';

interface Props {
	options: { value: string; label: string }[];
	initialValue: string;
	onValueChange?: (newValue: string) => void;
	isSelectFullWidth?: boolean;
	selectPadding?: string;
	variant?: SelectProps['variant'];
}

const Dropdown = ({
	options,
	initialValue,
	onValueChange,
	variant,
	isSelectFullWidth = false,
	selectPadding = '0.8rem 1rem',
	...props
}: Props) => {
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
			fullWidth={isSelectFullWidth}
			variant={variant}
			disableUnderline
			MenuProps={{
				disableScrollLock: true,
			}}
			sx={{
				minWidth: 195,
				'& .MuiSelect-select': { p: selectPadding },
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
