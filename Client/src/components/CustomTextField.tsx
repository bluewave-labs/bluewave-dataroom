import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	type?: string;
	minWidth?: number;
	[key: string]: any;
}
const CustomTextField = ({
	value,
	onChange,
	placeholder,
	type = 'text',
	minWidth = 400,
	...rest
}: CustomTextFieldProps) => (
	<TextField
		size="small"
		type={type}
		value={value}
		onChange={onChange}
		variant="outlined"
		placeholder={placeholder}
		sx={{ minWidth, my: 4 }}
		{...rest}
	/>
);

export default CustomTextField;
