import { TextField, Typography, Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

interface ValidationRule {
	rule: (value: string) => boolean;
	message: string;
}

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
	showErrors?: boolean;
	errorMessage?: string;
	validationRules?: ValidationRule[];
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
	showErrors = false,
	errorMessage = '',
	validationRules = [],
}: AuthInputProps) => {
	const [fieldError, setFieldError] = useState('');

	useEffect(() => {
		if (showErrors && validationRules.length > 0) {
			const firstError = validationRules.find((rule) => !rule.rule(value || ''));
			setFieldError(firstError ? firstError.message : '');
		} else {
			setFieldError('');
		}
	}, [value, showErrors, validationRules]);

	return (
		<Box
		// minHeight={'5.5rem'}
		>
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
				error={Boolean(showErrors && (fieldError || errorMessage))}
				helperText={showErrors ? fieldError || errorMessage : ''}
				slotProps={{
					formHelperText: {
						sx: {
							mt: 1,
						},
					},
				}}
			/>
		</Box>
	);
};

export default AuthInput;
