import axios from 'axios';
import React from 'react';
import { useToast } from '@/hooks/useToast';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import CustomAccordion from './CustomAccordion';
import SendingAccordion from './SendingAccordion';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';

interface Props {
	onClose: (action: string) => void;
	open: boolean;
	documentId: string;
}

const CreateLink = ({ onClose, open, documentId }: Props) => {
	const { showToast } = useToast();
	const [loading, setLoading] = React.useState(true);
	const [shareableLink, setShareableLink] = React.useState('');
	const [error, setError] = React.useState<string | null>(null);
	const [expirationType, setExpirationType] = React.useState('days');
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
	const initialFormValues = {
		password: '',
		isPublic: false,
		otherEmails: '',
		friendlyName: '',
		expirationTime: '',
		requirePassword: false,
		expirationEnabled: false,
		requireUserDetails: false,
		requiredUserDetailsOption: 1
	};
	const [formValues, setFormValues] = React.useState(initialFormValues);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;

		let expirationTime = formValues.expirationTime;

		if (name === 'expirationDays') {
			const days = parseInt(value, 10);
			if (!isNaN(days)) {
				const date = new Date();
				date.setUTCDate(date.getUTCDate() + days);
				expirationTime = date.toISOString();
			}
		} else if (name === 'expirationDate') {
			const date = new Date(value);
			expirationTime = date.toISOString();
		}

		setFormValues((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	React.useEffect(() => {
		if (formValues.expirationTime) {
			const expirationDate = new Date(formValues.expirationTime);
			const now = new Date();
			const diffTime = Math.abs(expirationDate.getTime() - now.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			setFormValues((prev) => ({
				...prev,
				expirationDays: diffDays.toString(),
				expirationDate: expirationDate.toISOString().split('T')[0],
			}));
		}
	}, [formValues.expirationTime]);

	const handleExpirationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExpirationType(event.target.value);
	};

	const getRequestPayload = () => {
		const payload: { [key: string]: any; } = {
			documentId,
			isPublic: formValues.isPublic,
		};

		if (formValues.requireUserDetails) {
			payload.requiredUserDetailsOption = formValues.requiredUserDetailsOption;
		}

		if (formValues.requirePassword) {
			payload.password = formValues.password;
		}

		if (formValues.expirationEnabled) {
			payload.expirationTime = formValues.expirationTime;
		}

		return payload;
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!document) return;

		try {
			setLoading(true);
			let reqBody = getRequestPayload();
			const response = await axios.post('/api/links', reqBody);
			setShareableLink(response.data.link.linkUrl);
			setFormValues(initialFormValues); // Reset form values
			showToast({
				message: 'Shareable link created successfully',
				variant: 'success',
			});

		} catch (error) {
			setError('Failed to create shareable link. Please try again later.');
			showToast({
				message: 'Failed to create shareable link. Please try again later.',
				variant: 'error',
			});
		} finally {
			setLoading(false);
		}
		onClose('Form Submitted');
	};

	if (shareableLink) {
		return <Dialog open={!!shareableLink} onClose={() => setShareableLink('')}>
			<DialogTitle fontSize={20}>Shareable Link</DialogTitle>
			<DialogContent>
				<Typography color="text.secondary" fontSize={15} fontWeight={500} >
					{shareableLink}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={() => setShareableLink('')}>Close</Button>
			</DialogActions>
		</Dialog>;
	}

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
					padding: '32px 0',
				}}>
				<Box
					width={580}
					>
					<CustomAccordion
						title='Link Details'
						defaultExpanded>
						<LinkDetailsAccordion
							formValues={formValues}
							handleInputChange={handleInputChange}
						/>
					</CustomAccordion>
					<CustomAccordion title='Sharing Options'>
						<SharingOptionsAccordion
							formValues={formValues}
							handleInputChange={handleInputChange}
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
							expirationType={expirationType}
							handleExpirationChange={handleExpirationChange}
						/>
					</CustomAccordion>
					{/* <CustomAccordion title='Sending'>
						<SendingAccordion
							formValues={formValues}
							handleCheckboxChange={handleInputChange}
						/>
					</CustomAccordion> */}
				</Box>

			</DialogContent>
			<DialogActions sx={{ padding: '32px' }}>
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
