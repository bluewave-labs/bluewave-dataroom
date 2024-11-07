import { TextField, Typography, Box } from '@mui/material';
import { ChangeEvent } from 'react';
interface AuthInputProps {
	label: string;
	id: string;
	type?: string;
	placeholder?: string;
	value?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	autoComplete?: string;
	autoFocus?: boolean;
}
const AuthInput = ({
	label,
	id,
	type = 'text',
	placeholder,
	value,
	onChange,
	required = false,
	autoComplete = 'off',
	autoFocus = false,
}: AuthInputProps) => {
	return (
		<Box>
			<Typography color="text.primary" fontSize={15} fontWeight={500} mt={2} mb={1}>
				{label}
			</Typography>
			<TextField
				id={id}
				type={type}
				placeholder={placeholder}
				autoComplete={autoComplete}
				size="small"
				fullWidth
				required={required}
				autoFocus={autoFocus}
				variant="outlined"
				value={value}
				onChange={onChange}
			/>
		</Box>
	);
};
export default AuthInput;
