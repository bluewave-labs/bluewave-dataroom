'use client';

import axios from 'axios';
import React from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import FormInput from '@/components/FormInput';
import LoadingButton from '@/components/LoadingButton';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useValidatedFormData } from '@/hooks/useValidatedFormData';

import { requiredFieldRule, validEmailRule } from '@/utils/shared/validators';

import FileDownloadIcon from '@/../public/assets/icons/link/FileDownloadIcon';

const RowBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	'& > p': {
		flex: 2,
		fontWeight: 500,
	},
	'& > div:nth-of-type(1)': {
		flex: 7,
	},
	'& > div:nth-of-type(2)': {
		flex: 1,
	},
});

function getFormConfig(passwordRequired: boolean, userDetailsOption: number) {
	const formConfig: {
		initialValues: { [key: string]: string };
		validationRules: { [key: string]: any[] };
	} = {
		initialValues: {},
		validationRules: {},
	};

	if (passwordRequired) {
		formConfig.initialValues.password = '';
		formConfig.validationRules.password = [requiredFieldRule('*This field is required')];
	}

	if (userDetailsOption === 1) {
		formConfig.initialValues.name = '';
		formConfig.validationRules.name = [requiredFieldRule('*This field is required')];
	}

	if (userDetailsOption === 2) {
		formConfig.initialValues.name = '';
		formConfig.initialValues.email = '';
		formConfig.validationRules.name = [requiredFieldRule('*This field is required')];
		formConfig.validationRules.email = [
			requiredFieldRule('*This field is required / Please enter a valid Email'),
			validEmailRule,
		];
	}

	return formConfig;
}

interface FileAccessModalProps {
	linkId: string;
	passwordRequired: boolean;
	userDetailsOption: number;
	onFileAccessModalSubmit: (data: { [key: string]: any }) => void;
}

const FileAccessModal = (props: FileAccessModalProps) => {
	const { linkId, passwordRequired, userDetailsOption, onFileAccessModalSubmit } = props;

	const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

	const formConfig = getFormConfig(passwordRequired, userDetailsOption);

	const { values, handleChange, handleBlur, getError, validateAll } = useValidatedFormData({
		initialValues: formConfig.initialValues,
		validationRules: formConfig.validationRules,
	});

	const { loading, handleSubmit, toast } = useFormSubmission({
		onSubmit: async () => {
			// Check if any validations fail
			const hasError = validateAll();
			if (hasError) {
				throw new Error('Please correct the highlighted fields.');
			}

			if (values.password || values.name || values.email) {
				try {
					// Splitting `name` into `first_name` and `last_name`

					let first_name = '';
					let last_name = '';
					if (values.name) {
						const splitted = values.name.trim().split(' ');
						first_name = splitted[0] || '';
						last_name = splitted.slice(1).join(' ') || '';
					}

					// Construct the POST data for shared_access route
					const payload = {
						linkId,
						first_name,
						last_name,
						email: values.email || '',
						password: values.password || '',
					};

					const response = await axios.post('/api/links/shared_access', payload);
					if (response.data.data) {
						onFileAccessModalSubmit(response.data.data);
					} else {
						toast.showToast({
							variant: 'error',
							message: response.data.message,
						});
					}
				} catch (error) {
					console.error('Error accessing link:', error);
					toast.showToast({
						variant: 'error',
						message: 'Unexpected error occurred while accessing the link.',
					});
				}
			}
		},
	});

	return (
		<Dialog
			open
			onClose={() => {}}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
				sx: { minWidth: 600, padding: 0 },
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					margin: '24px',
				}}>
				<Box
					sx={{
						borderRadius: '4px',
						padding: '10px',
						border: '1px solid #EAECF0',
					}}>
					<FileDownloadIcon />
				</Box>
				<Box sx={{ ml: 6 }}>
					<Typography variant='h3'>Your Information</Typography>
					<Typography variant='body1'>Enter your details to access the document</Typography>
				</Box>
			</Box>

			<Divider />

			<DialogContent sx={{ margin: '24 px' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						gap: 10,
					}}>
					{[1, 2].includes(userDetailsOption) && (
						<RowBox>
							<Typography variant='body1'>Name</Typography>
							<FormInput
								id='name'
								value={values.name || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								errorMessage={getError('name')}
								placeholder='Your Name'
							/>
							<Box />
						</RowBox>
					)}

					{userDetailsOption === 2 && (
						<RowBox>
							<Typography variant='body1'>Email</Typography>
							<FormInput
								id='email'
								type='email'
								value={values.email || ''}
								onChange={handleChange}
								onBlur={handleBlur}
								errorMessage={getError('email')}
								placeholder='your_email@bluewave.com'
							/>
							<Box />
						</RowBox>
					)}

					{userDetailsOption === 2 && passwordRequired && <Divider />}

					{passwordRequired && (
						<RowBox>
							<Typography
								variant='body1'
								mt={10}>
								Password
							</Typography>
							<FormInput
								placeholder=''
								id='password'
								label='Please enter the password shared with you'
								value={values.password || ''}
								onChange={handleChange}
								errorMessage={getError('password')}
								onBlur={handleBlur}
								type={isPasswordVisible ? 'text' : 'password'}
							/>
							<Box>
								<IconButton
									size='large'
									sx={{ ml: 5, mt: 10 }}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
									{isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</Box>
						</RowBox>
					)}
				</Box>
			</DialogContent>

			<Divider />

			<DialogActions sx={{ padding: 0, margin: '24px' }}>
				<LoadingButton
					loading={loading}
					buttonText='Confirm'
					loadingText='Confirming...'
					fullWidth
					type='submit'
				/>
			</DialogActions>
		</Dialog>
	);
};

export default FileAccessModal;
