import {
	MenuItem,
	Select,
	SelectChangeEvent,
	StandardSelectProps,
	menuClasses,
	selectClasses,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

interface Props extends StandardSelectProps {
	options: { value: string; label: string }[];
	initialValue: string; // Use initialValue instead of value
	onValueChange?: (newValue: string) => void; // Optional callback for when the value changes
}

const Dropdown = ({
	options,
	initialValue,
	onValueChange,
	...props
}: Props) => {
	const theme = useTheme();
	const [value, setValue] = useState<string>(initialValue);

	const handleChange = (event: SelectChangeEvent<unknown>) => {
		const newValue = event.target.value as string;
		setValue(newValue);

		// If a callback is provided, call it with the new value
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
				PaperProps: {
					sx: {
						borderRadius: '0.5rem',
						marginTop: '0.5rem',
						[`& .${menuClasses.list}`]: {
							paddingTop: 0,
							paddingBottom: 0,
							backgroundColor: theme.palette.background.paper,
							'& li': {
								paddingTop: '0.5rem',
								paddingBottom: '0.5rem',
							},
							'& li:hover': {
								backgroundColor: theme.palette.primary.light,
							},
							'& li.Mui-selected': {
								color: theme.palette.primary.contrastText,
								backgroundColor: theme.palette.primary.main,
							},
							'& li.Mui-selected:hover': {
								backgroundColor: theme.palette.primary.dark,
							},
						},
					},
				},
			}}
			sx={{
				minWidth: 195,
				[`& .${selectClasses.select}`]: {
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.primary.main,
					borderRadius: '0.5rem',
					paddingX: '1rem',
					paddingY: '0.8rem',
					boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.1)',
				},
				[`& .${selectClasses.icon}`]: {
					right: '0.5rem',
				},
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
