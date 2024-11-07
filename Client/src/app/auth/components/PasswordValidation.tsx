import { Box, Typography } from '@mui/material';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';

interface PasswordValidationProps {
	isLengthValid: boolean;
	hasSpecialChar: boolean;
}

const PasswordValidation = ({ isLengthValid, hasSpecialChar }: PasswordValidationProps) => {
	return (
		<>
			<Box display="flex" alignItems="center" my={2} gap={1}>
				<CheckIcon color={isLengthValid ? 'success' : undefined} />
				<Typography variant="body2">Must be at least 8 characters</Typography>
			</Box>
			<Box display="flex" alignItems="center" my={2} gap={1}>
				<CheckIcon color={hasSpecialChar ? 'success' : undefined} />
				<Typography variant="body2">Must contain one special character</Typography>
			</Box>
		</>
	);
};

export default PasswordValidation;
