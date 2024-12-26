// Client/src/app/auth/components/PasswordValidation.tsx
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';
import { getPasswordChecks } from '@/utils/shared/validators';

interface PasswordValidationProps {
	passwordValue: string;
}

const PasswordValidation: FC<PasswordValidationProps> = ({ passwordValue }) => {
	const { isLengthValid, hasSpecialChar } = getPasswordChecks(passwordValue);

	return (
		<Box
			display='flex'
			flexDirection='column'
			gap={1}
			mb={3}>
			<Box
				display='flex'
				alignItems='center'
				gap={1}>
				<CheckIcon color={isLengthValid ? 'success' : undefined} />
				<Typography variant='body2'>Must be at least 8 characters</Typography>
			</Box>

			<Box
				display='flex'
				alignItems='center'
				gap={1}>
				<CheckIcon color={hasSpecialChar ? 'success' : undefined} />
				<Typography variant='body2'>Must contain at least one special character</Typography>
			</Box>
		</Box>
	);
};

export default PasswordValidation;
