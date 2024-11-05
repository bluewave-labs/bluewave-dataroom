import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import Checked from '../../public/assets/icons/documentPage/Checked';
import Unchecked from '../../public/assets/icons/documentPage/Unchecked';

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
				icon={<Unchecked />}
				checkedIcon={<Checked />}
				checked={checked}
				name={name}
				onChange={onChange}
			/>
		}
		label={label}
	/>
);

export default CustomCheckbox;
