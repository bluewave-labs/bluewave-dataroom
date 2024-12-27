import { Box, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, FocusEvent } from 'react';

interface AuthInputProps {
	label?: string;
	id: string;
	name?: string;
	type?: string;
	placeholder?: string;
	value: any;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	required?: boolean;
	autoComplete?: string;
	autoFocus?: boolean;
	errorMessage?: string;
}

const AuthInput: FC<AuthInputProps> = ({
	label,
	id,
	name,
	type = 'text',
	placeholder,
	value,
	onChange,
	onBlur,
	required = false,
	autoComplete = 'off',
	autoFocus = false,
	errorMessage = '',
}) => {
	const displayError = Boolean(errorMessage);

	return (
		<Box>
			{label && (
				<Typography
					variant='body1'
					fontWeight={500}
					mb={1}>
					{label}
				</Typography>
			)}
			<TextField
				id={id}
				name={name || id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				required={required}
				autoComplete={autoComplete}
				autoFocus={autoFocus}
				error={displayError}
				helperText={displayError ? errorMessage : ''}
				fullWidth
				variant='outlined'
				size='small'
			/>
		</Box>
	);
};

export default AuthInput;
