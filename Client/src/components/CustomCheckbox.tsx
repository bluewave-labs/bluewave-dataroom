import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import UncheckedIcon from '../../public/assets/icons/documentPage/UncheckedIcon';
import CheckedIcon from '../../public/assets/icons/documentPage/CheckedIcon';

interface CustomCheckboxProps {
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	name: string;
}

const CustomCheckbox = ({ checked, onChange, label, name }: CustomCheckboxProps) => (
	<FormControlLabel
		control={
			<Checkbox
				icon={<UncheckedIcon />}
				checkedIcon={<CheckedIcon />}
				checked={checked}
				name={name}
				onChange={onChange}
			/>
		}
		label={label}
	/>
);

export default CustomCheckbox;
