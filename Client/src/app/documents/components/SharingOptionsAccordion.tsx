import { Box, Divider, IconButton, Typography, RadioGroup, Radio } from '@mui/material';
import CustomTextField from '@/components/CustomTextField';
import CustomCheckbox from '@/components/CustomCheckbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface SharingOptionsAccordionProps {
	formValues: any;
	handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isPasswordVisible: boolean;
	setIsPasswordVisible: (visible: boolean) => void;
	expirationType: string;
	handleExpirationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SharingOptionsAccordion = ({
	formValues,
	handleCheckboxChange,
	isPasswordVisible,
	setIsPasswordVisible,
	expirationType,
	handleExpirationChange,
}: SharingOptionsAccordionProps) => (
	<Box py={4}>
		<CustomCheckbox
			checked={formValues.requirePassword}
			onChange={handleCheckboxChange}
			name="requirePassword"
			label="Require a password to view and download the document"
		/>
		<Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={4} ml={13}>
			<CustomTextField
				minWidth={420}
				value={formValues.password}
				onChange={(e) =>
					handleCheckboxChange({
						target: {
							name: 'password',
							value: e.target.value,
						},
					} as any)
				}
				placeholder="Enter password"
				type={isPasswordVisible ? 'text' : 'password'}
			/>
			<IconButton size="large" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
				{isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
			</IconButton>
		</Box>
		<CustomCheckbox
			checked={formValues.expirationEnabled}
			onChange={handleCheckboxChange}
			name="expirationEnabled"
			label="Expiration"
		/>
		<Typography variant="body2" mb={3}>
			Link won’t be visible after a certain day or a certain date.
		</Typography>
		<RadioGroup
			aria-label="expiration"
			name="expirationType"
			value={expirationType}
			onChange={handleExpirationChange}
			sx={{ display: 'flex', gap: 12, ml: 7.5 }}>
			<Box display="flex" alignItems="center" gap={2}>
				<Radio value="days" />
				<CustomTextField
					value={formValues.expirationDays}
					onChange={(e) =>
						handleCheckboxChange({
							target: {
								name: 'expirationDays',
								value: e.target.value,
							},
						} as any)
					}
					placeholder=""
					type="number"
					minWidth={200}
				/>
				<Typography variant="body1" ml={1}>
					days
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={2}>
				<Radio value="date" />
				<CustomTextField
					value={formValues.expirationDate}
					onChange={(e) =>
						handleCheckboxChange({
							target: {
								name: 'expirationDate',
								value: e.target.value,
							},
						} as any)
					}
					placeholder=""
					type="date"
					minWidth={200}
				/>
			</Box>
		</RadioGroup>
	</Box>
);

export default SharingOptionsAccordion;
