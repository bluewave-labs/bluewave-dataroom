import TextField from '@mui/material/TextField';

//NEED TO FIX THIS, EXTEND THE INTERFACE for TextFieldProps

interface CustomTextFieldProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	type?: string;
	minWidth?: number;
}
const CustomT9extField = ({
	value,
	onChange,
	placeholder,
	type = 'text',
	minWidth = 400,
}: CustomTextFieldProps) => (
	<TextField
		size='small'
		type={type}
		value={value}
		onChange={onChange}
		variant='outlined'
		placeholder={placeholder}
		sx={{ minWidth, my: 4 }}
	/>
);

export default CustomT9extField;
