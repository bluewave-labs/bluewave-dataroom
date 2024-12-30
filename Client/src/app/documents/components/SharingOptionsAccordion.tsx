import CustomCheckbox from '@/components/CustomCheckbox';
import CustomTextField from '@/components/CustomTextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, Radio, RadioGroup, Select, Typography, MenuItem, Menu } from '@mui/material';

interface SharingOptionsAccordionProps {
	formValues: any;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	isPasswordVisible: boolean;
	setIsPasswordVisible: (visible: boolean) => void;
	expirationType: string;
	handleExpirationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SharingOptionsAccordion = ({
	formValues,
	handleInputChange,
	isPasswordVisible,
	setIsPasswordVisible,
	expirationType,
	handleExpirationChange,
}: SharingOptionsAccordionProps) => (
	<Box py={4}>
		<CustomCheckbox
			checked={formValues.requireUserDetails}
			onChange={handleInputChange}
			name="requireUserDetails"
			label="Ask for the following to view and download the document"
		/>
		<Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={4} ml={13}>
			<Select
				size='small'
				name='requireUserDetailsOption'
				sx={{ minWidth: 250 }}
				disabled={!formValues.requireUserDetails}
				value={formValues.requireUserDetailsOption}
				onChange={(event) => {
					handleInputChange({
						target: {
							name: 'requireUserDetailsOption',
							value: event.target.value,
						},
					} as any);
				}}>
				<MenuItem value={1}>Name, surname</MenuItem>
				<MenuItem value={2}>Name, surname, and email</MenuItem>
			</Select>
		</Box>
		<CustomCheckbox
			checked={formValues.requirePassword}
			onChange={handleInputChange}
			name="requirePassword"
			label="Require a password to view and download the document"
		/>
		<Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={4} ml={13}>
			<CustomTextField
				minWidth={420}
				value={formValues.password}
				onChange={(e) =>
					handleInputChange({
						target: {
							name: 'password',
							value: e.target.value,
						},
					} as any)
				}
				placeholder="Enter password"
				type={isPasswordVisible ? 'text' : 'password'}
				disabled={!formValues.requirePassword}
			/>
			<IconButton size="large" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
				{isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
			</IconButton>
		</Box>
		<CustomCheckbox
			checked={formValues.expirationEnabled}
			onChange={handleInputChange}
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
			{/* <Box display="flex" alignItems="center" gap={2}>
				<Radio value="days" />
				<CustomTextField
					value={formValues.expirationDays}
					onChange={(e) =>
						handleInputChange({
							target: {
								name: 'expirationDays',
								value: e.target.value,
							},
						} as any)
					}
					placeholder=""
					type="number"
					minWidth={200}
					disabled={!formValues.expirationEnabled}
				/>
				<Typography variant="body1" ml={1}>
					days
				</Typography>
			</Box> */}
			<Box display="flex" alignItems="center" gap={2}>
				{/* <Radio value="date" /> */}
				<Typography variant="body1" mr={4}>Expiration time</Typography>
				<CustomTextField
					value={formValues.expirationTime}
					// name='expirationTime'
					onChange={(e) =>
						handleInputChange({
							target: {
								name: 'expirationTime',
								value: e.target.value,
							},
						} as any)
					}
					placeholder=""
					type="date"
					minWidth={200}
					disabled={!formValues.expirationEnabled}
				/>
			</Box>
		</RadioGroup>
	</Box>
);

export default SharingOptionsAccordion;
