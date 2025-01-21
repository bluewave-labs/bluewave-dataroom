import axios from 'axios';
import React from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
	IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import CustomAccordion from './CustomAccordion';
import LinkDetailsAccordion from './LinkDetailsAccordion';
import SharingOptionsAccordion from './SharingOptionsAccordion';
import SendingAccordion from './SendingAccordion';
import LoadingButton from '@/components/LoadingButton';

import { useFormSubmission, useValidatedFormData } from '@/hooks';

import { LinkFormValues } from '@/utils/shared/models';
import { computeExpirationDays } from '@/utils/shared/utils';
import { minLengthRule } from '@/utils/shared/validators';
import CopyIcon from '../../../../public/assets/icons/documentPage/CopyIcon';

interface CreateLinkProps {
	onClose: (action: string) => void;
	open: boolean;
	documentId: string;
}

export default function CreateLink({ onClose, open, documentId }: CreateLinkProps) {
	const [isLinkCopied, setIsLinkCopied] = React.useState(false);
	const [shareableLink, setShareableLink] = React.useState('');
	const [expirationType, setExpirationType] = React.useState('days');
	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const validationRules = {
		password: [minLengthRule(5, 'Password must be at least 5 characters long.')],
	};

	const initialFormValues: LinkFormValues = {
		password: '',
		isPublic: true,
		otherEmails: '',
		friendlyName: '',
		expirationTime: '',
		requirePassword: false,
		expirationEnabled: false,
		requireUserDetails: false,
		requiredUserDetailsOption: 1,
	};

	const { values, setValues, validateAll } = useValidatedFormData<LinkFormValues>({
		initialValues: initialFormValues,
		validationRules,
	});

	const handleInputChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value, type, checked } = event.target;

			// If user sets expirationDays
			if (name === 'expirationDays') {
				const days = parseInt(value, 10);
				if (!isNaN(days)) {
					const date = new Date();
					date.setUTCDate(date.getUTCDate() + days);
					setValues((prev) => ({
						...prev,
						expirationTime: date.toISOString(),
						expirationDays: days.toString(),
					}));
				} else {
					// If user empties the field
					setValues((prev) => ({ ...prev, expirationDays: '' }));
				}
			}
			// If user sets expirationDate
			else if (name === 'expirationDate') {
				const date = new Date(value);
				setValues((prev) => ({
					...prev,
					expirationTime: date.toISOString(),
					expirationDate: value,
				}));
			}
			// Otherwise, default handleChange from useValidatedFormData
			else {
				// If it's a checkbox, we do the checked logic. If not, normal string value.
				setValues((prev) => ({
					...prev,
					[name]: type === 'checkbox' ? checked : value,
				}));
			}
		},
		[setValues],
	);

	/**
	 * useEffect to recalc expirationDays if expirationTime changes outside of direct user input
	 */
	React.useEffect(() => {
		if (values.expirationTime) {
			const diffDays = computeExpirationDays(values.expirationTime);
			setValues((prev) => ({
				...prev,
				expirationDays: diffDays.toString(),
			}));
		}
	}, [values.expirationTime, setValues]);

	const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setExpirationType(e.target.value);
	};

	/**
	 * Build final payload for POST request
	 */
	const buildRequestPayload = (): Record<string, any> => {
		const payload: Record<string, any> = {
			documentId,
			isPublic: values.isPublic,
		};
		if (values.requireUserDetails) {
			payload.requiredUserDetailsOption = values.requiredUserDetailsOption;
		}
		if (values.requirePassword) {
			payload.password = values.password;
		}
		if (values.expirationEnabled) {
			payload.expirationTime = values.expirationTime;
		}
		return payload;
	};

	const { loading, handleSubmit, error, toast } = useFormSubmission({
		onSubmit: async () => {
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct any errors before generating a link.');
			}

			const payload = buildRequestPayload();
			const response = await axios.post('/api/links', payload);
			if (!response.data?.link?.linkUrl) {
				throw new Error('No link returned by server.');
			}
			setShareableLink(response.data.link.linkUrl);
			setValues(initialFormValues);
		},
		onSuccess: () => {
			toast.showToast({
				message: 'Shareable link created successfully!',
				variant: 'success',
			});
			onClose('Form submitted');
		},
		onError: (errMsg) => {
			console.error('Create link error:', errMsg);
		},
		errorMessage: 'Failed to create shareable link. Please try again later.',
	});

	const handleLinkCopy = (linkToCopy: string) => {
		if (linkToCopy) {
			navigator.clipboard.writeText(linkToCopy);
			setIsLinkCopied(true);
			setTimeout(() => {
				setIsLinkCopied(false);
			}, 3000);
		}
	};

	// If shareableLink is set, show the link in a separate dialog
	if (shareableLink) {
		return (
			<Dialog
				open={!!shareableLink}
				onClose={() => setShareableLink('')}
				PaperProps={{ sx: { minWidth: 500, minHeight: 100, p: 10 } }}>
				<DialogTitle variant='h2'>Shareable link</DialogTitle>
				<DialogContent
					sx={{
						p: 0,
						mt: 5,
					}}>
					<Box
						display='flex'
						alignItems='center'>
						<Typography variant='h5'>{shareableLink}</Typography>
					</Box>
				</DialogContent>
				<DialogActions>
					<IconButton
						sx={{ ml: 2 }}
						onClick={() => {
							handleLinkCopy(shareableLink);
						}}>
						{isLinkCopied ? <CheckIcon fontSize='small' /> : <CopyIcon />}
					</IconButton>
				</DialogActions>
			</Dialog>
		);
	}

	return (
		<Dialog
			open={open}
			onClose={() => onClose('cancelled')}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
				sx: { minWidth: 650, minHeight: 550 },
			}}>
			<DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 16, px: 0 }}>
				<Box width={580}>
					{/* <CustomAccordion
						title='Link Details'
						defaultExpanded>
						<LinkDetailsAccordion
							formValues={values}
							handleInputChange={handleInputChange}
						/>
					</CustomAccordion> */}

					<CustomAccordion title='Sharing Options'>
						<SharingOptionsAccordion
							formValues={values}
							handleInputChange={handleInputChange}
							isPasswordVisible={isPasswordVisible}
							setIsPasswordVisible={setIsPasswordVisible}
							expirationType={expirationType}
							handleExpirationChange={handleExpirationChange}
						/>
					</CustomAccordion>

					{/*
          // <CustomAccordion title="Sending">
          //   <SendingAccordion
          //     formValues={values}
          //     handleCheckboxChange={handleInputChange}
          //   />
          // </CustomAccordion>
          */}
				</Box>
			</DialogContent>

			<DialogActions sx={{ p: 16 }}>
				<LoadingButton
					loading={loading}
					buttonText='Generate'
					loadingText='Generating...'
					fullWidth
					type='submit'
				/>
			</DialogActions>
		</Dialog>
	);
}
