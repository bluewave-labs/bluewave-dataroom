import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import CustomAccordion from './CustomAccordion';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SendingAccordion from './SendingAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';

interface Props {
	onClose: (action: string) => void;
	open: boolean;
}

const CreateLink = ({ onClose, open }: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [expirationType, setExpirationType] = useState('days');
	const [formValues, setFormValues] = useState({
		allowPreviewDownload: false,
		requirePassword: false,
		expirationEnabled: false,
		selectFromContact: false,
		sendToOthers: false,
		expirationDays: '1',
		expirationDate: '2024-01-06',
		password: '',
		otherEmails: '',
	});

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.checked,
		});
	};

	const handleExpirationChange = (event: ChangeEvent<HTMLInputElement>) => {
		setExpirationType(event.target.value);
	};

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onClose('Form Submitted');
	};

	return (
		<Dialog
			open={open}
			onClose={() => onClose('cancelled')}
			PaperProps={{
				component: 'form',
				onSubmit: handleFormSubmit,
				sx: { minWidth: 650, minHeight: 550 },
			}}>
			<DialogContent
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<Box
					width={560}
					px={12}>
					<CustomAccordion
						title='Link Details'
						defaultExpanded>
						<LinkDetailsAccordion
							formValues={formValues}
							handleCheckboxChange={handleCheckboxChange}
						/>
					</CustomAccordion>
					<CustomAccordion title='Sharing Options'>
						<SharingOptionsAccordion
							formValues={formValues}
							handleCheckboxChange={handleCheckboxChange}
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
							expirationType={expirationType}
							handleExpirationChange={handleExpirationChange}
						/>
					</CustomAccordion>
					<CustomAccordion title='Sending'>
						<SendingAccordion
							formValues={formValues}
							handleCheckboxChange={handleCheckboxChange}
						/>
					</CustomAccordion>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					type='submit'
					variant='contained'>
					Generate
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateLink;
