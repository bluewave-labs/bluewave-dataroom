/**
 * A reusable input component built on top of MUI's TextField.
 * - Use `label` to display a heading above the field.
 * - Use `errorMessage` to display inline error text if validation fails.
 * - Extends MUI’s `TextFieldProps`, so you can pass any standard props
 *   like `type`, `value`, `onChange`, `variant`, `size`, `fullWidth`, etc.
 */

import React, { FC } from 'react';
import { Box, TextField, Typography, TextFieldProps } from '@mui/material';

interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
	//  An optional label rendered above the TextField.
	label?: string;
	// An inline error message displayed below the TextField if validation fails.
	// If this prop is provided, the TextField will display in an error state.
	errorMessage?: string;
}

const FormInput: FC<FormInputProps> = ({ label, errorMessage = '', ...textFieldProps }) => {
	// Determine if there is an error
	const displayError = Boolean(errorMessage);

	return (
		<Box>
			{/* Render a top label if provided */}
			{label && (
				<Typography
					variant='body1'
					fontWeight={500}
					mb={1}>
					{label}
				</Typography>
			)}

			{/* Render the MUI TextField. 
          - If `errorMessage` exists, we pass `error={true}` and `helperText` to show inline error.
          - Any other props (like `value`, `onChange`, `type`, etc.) 
            come from `...textFieldProps`.
       */}
			<TextField
				{...textFieldProps}
				error={displayError}
				helperText={displayError ? errorMessage : ''}
			/>
		</Box>
	);
};

export default FormInput;
