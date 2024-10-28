import ModalWrapper from '@/components/ModalWrapper';
import { Avatar, Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useModal } from '@/hooks/useModal';

export default function ProfileForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [photo, setPhoto] = useState('');

	const deleteModal = useModal();
	const uploadModal = useModal();

	const handleSave = () => {
		console.log('Profile Updated Successfully!');
	};

	const handleDeleteAccount = () => {
		console.log('Account Deleted!');
	};
	const handlePicUpdate = () => {
		console.log('Picture Updated Successfully!');
	};

	return (
		<>
			<Box component="form" noValidate autoComplete="off">
				<Grid container rowSpacing={14} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
					{/* First Name */}
					<Grid size={6}>
						<Typography variant="h3">First name</Typography>
					</Grid>
					<Grid size={6}>
						<TextField
							size="small"
							id="first-name"
							variant="outlined"
							fullWidth
							sx={{ borderRadius: 4 }}
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</Grid>

					{/* Last Name */}
					<Grid size={6}>
						<Typography variant="h3">Last name</Typography>
					</Grid>
					<Grid size={6}>
						<TextField
							size="small"
							id="last-name"
							variant="outlined"
							fullWidth
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Grid>

					{/* Email */}
					<Grid size={6}>
						<Typography variant="h3">Email</Typography>
						<Typography variant="subtitle1">
							This is your current email address — it cannot be changed.
						</Typography>
					</Grid>
					<Grid size={6}>
						<TextField
							size="small"
							id="email"
							variant="outlined"
							disabled
							fullWidth
							placeholder="mahid@acme.com"
						/>
					</Grid>

					{/* Photo */}
					<Grid size={6}>
						<Typography variant="h3">Your photo</Typography>
						<Typography variant="subtitle1">
							This photo will be displayed on your profile page.
						</Typography>
					</Grid>
					<Grid size={6}>
						<Box display="flex" alignItems="center">
							<Avatar
								alt="Profile Picture"
								src="https://picsum.photos/200/200"
								sx={{ width: 56, height: 56, mr: 7 }}
							/>
							<Link href="#" underline="hover" sx={{ px: 4, color: 'text.secondary' }}>
								Delete
							</Link>
							<Link
								href="#"
								underline="hover"
								sx={{ px: 4, color: 'text.brand' }}
								onClick={uploadModal.openModal}>
								Update
							</Link>
						</Box>
					</Grid>
				</Grid>

				{/* Save Button */}
				<Box display="flex" justifyContent="flex-end" mt={40}>
					<Button variant="contained" size="medium" color="primary" onClick={handleSave}>
						Save
					</Button>
				</Box>

				<Divider sx={{ mb: 7, mt: 14 }} />

				{/* Delete Account Section */}
				<Box display="flex" flexDirection="column" mb={4} rowGap={6}>
					<Typography variant="h3" fontWeight="bold">
						Delete account
					</Typography>
					<Typography variant="subtitle1" sx={{ mb: 2 }}>
						Note that deleting your account will remove all data from our system. This is permanent
						and non-recoverable.
					</Typography>

					{/* Delete Account Button */}
					<Box justifyContent="flex-start">
						<Button variant="contained" size="medium" color="error" onClick={deleteModal.openModal}>
							Delete account
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Delete Account Modal */}
			<ModalWrapper
				variant="delete"
				title="Really delete this account?"
				description="If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable."
				confirmButtonText="Delete account"
				cancelButtonText="Cancel"
				open={deleteModal.isOpen}
				onClose={handleDeleteAccount}
				toggleModal={deleteModal.closeModal}
			/>

			{/* Upload Photo Modal */}
			<ModalWrapper
				variant="upload"
				title="Upload profile image"
				confirmButtonText="Update"
				open={uploadModal.isOpen}
				onClose={handlePicUpdate}
				maxFileSize="3"
				fileFormats="JPG, PNG"
				toggleModal={uploadModal.closeModal}
			/>
		</>
	);
}
