import axios from 'axios';
import { useToast } from '@/hooks/useToast';
import CustomAccordion from './CustomAccordion';
import SendingAccordion from './SendingAccordion';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface Props {
	onClose: (action: string) => void;
	open: boolean;
	documentId: string;
}

const CreateLink = ({ onClose, open, documentId }: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { showToast } = useToast();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [expirationType, setExpirationType] = useState('days');
	const [formValues, setFormValues] = useState({
		password: '',
		isPublic: false,
		otherEmails: '',
		friendlyName: '',
		expirationTime: '',
		requirePassword: false,
		expirationEnabled: false,
		requireUserDetails: false,
		requireUserDetailsOption: 1
	});
	const [shareableLink, setShareableLink] = useState('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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

		console.log('name', name, value);

		setFormValues((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	useEffect(() => {
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

	const handleExpirationChange = (event: ChangeEvent<HTMLInputElement>) => {
		setExpirationType(event.target.value);
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!document) return;

		try {
			setLoading(true);
			const response = await axios.post('/api/links', {
				documentId,
				friendlyName: formValues.friendlyName,
				isPublic: formValues.isPublic,
				password: formValues.password,
				expirationTime: formValues.expirationTime,
			});
			setShareableLink(response.data.link.linkUrl);
			console.log('response', response.data);
			showToast({
				message: 'Shareable link created successfully',
				variant: 'success',
			});
		} catch (error) {
			setError('Failed to create shareable link. Please try again later.');
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
				<Button onClick={() => setShareableLink('')}>Close</Button>
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
				}}>
				<Box
					width={560}
					px={12}>
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
