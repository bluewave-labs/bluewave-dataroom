import { Box, Typography } from '@mui/material';
import CheckIcon from '../../../../public/assets/icons/auth/CheckIcon';
interface PasswordValidationProps {
	isLengthValid: boolean;
	hasSpecialChar: boolean;
}
const PasswordValidation = ({ isLengthValid, hasSpecialChar }: PasswordValidationProps) => {
	return (
		<Box display="flex" flexDirection="column" gap={6} mb={3}>
			<Box display="flex" alignItems="center" gap={5}>
				<CheckIcon color={isLengthValid ? 'success' : undefined} />
				<Typography variant="body2">Must be at least 8 characters</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={5}>
				<CheckIcon color={hasSpecialChar ? 'success' : undefined} />
				<Typography variant="body2">Must contain one special character</Typography>
			</Box>
		</Box>
	);
};
export default PasswordValidation;
