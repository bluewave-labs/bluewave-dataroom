import ModalWrapper from '@/components/ModalWrapper';
import Toast from '@/components/Toast';
import { useModal } from '@/hooks/useModal';
import { useToast } from '@/hooks/useToast';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Divider, Link, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

export default function ProfileForm() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [photo, setPhoto] = useState('');

	const deleteAccountModal = useModal();
	const deletePhotoModal = useModal();
	const uploadModal = useModal();

	const photoDeleteToast = useToast();
	const photoUpdateToast = useToast();
	const profileSaveToast = useToast();
	const accountDeleteToast = useToast();

	const handleSave = () => {
		console.log('Profile Updated Successfully!');
		profileSaveToast.showToast();
	};

	const handleDeleteAccount = () => {
		console.log('Account Deleted!');
		accountDeleteToast.showToast();
	};

	const handleDeletePhoto = () => {
		console.log('Photo Deleted!');
		photoDeleteToast.showToast();
	};
	const handlePicUpdate = () => {
		console.log('Picture Updated Successfully!');
		photoUpdateToast.showToast();
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
							<Box
								sx={{
									position: 'relative',
									width: 64,
									height: 64,
									borderRadius: '50%',
									overflow: 'hidden',
									'&:hover .avatar-edit-icon': {
										opacity: 1,
									},
								}}>
								<Avatar
									alt="Profile Picture"
									src="https://picsum.photos/200/200"
									sx={{ width: 64, height: 64, mr: 7 }}
								/>

								<Box
									className="avatar-edit-icon"
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: 'rgba(0, 0, 0, 0.15)',
										color: 'white',
										opacity: 0,
										transition: 'opacity 0.3s',
										cursor: 'pointer',
									}}
									onClick={uploadModal.openModal}>
									<EditIcon fontSize="medium" />
								</Box>
							</Box>
							<Link
								href="#"
								underline="hover"
								sx={{ px: 4, color: 'text.secondary' }}
								onClick={deletePhotoModal.openModal}>
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
						<Button
							variant="contained"
							size="medium"
							color="error"
							onClick={deleteAccountModal.openModal}>
							Delete account
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Delete Photo Modal */}
			<ModalWrapper
				variant="delete"
				title="Really delete this Photo?"
				description="When you delete this Photo, all the links associated with the Photo will also be removed. This action is non-reversible."
				confirmButtonText="Delete Photo"
				open={deletePhotoModal.isOpen}
				onClose={handleDeletePhoto}
				toggleModal={deletePhotoModal.closeModal}
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
			{/* Delete Account Modal */}
			<ModalWrapper
				variant="delete"
				title="Really delete this account?"
				description="If you delete your account, you will no longer be able to sign in, and all of your data will be deleted. Deleting your account is permanent and non-recoverable."
				confirmButtonText="Delete account"
				cancelButtonText="Cancel"
				open={deleteAccountModal.isOpen}
				onClose={handleDeleteAccount}
				toggleModal={deleteAccountModal.closeModal}
			/>
			<Toast
				message="Profile Updated Successfully!"
				open={profileSaveToast.open}
				hideToast={profileSaveToast.hideToast}
				variant="success"
			/>
			<Toast
				message="Account Deleted!"
				open={accountDeleteToast.open}
				hideToast={accountDeleteToast.hideToast}
				variant="error"
			/>
			<Toast
				message="Photo Deleted!"
				open={photoDeleteToast.open}
				hideToast={photoDeleteToast.hideToast}
				variant="error"
			/>
			<Toast
				message="Picture Updated Successfully!"
				open={photoUpdateToast.open}
				hideToast={photoUpdateToast.hideToast}
				variant="success"
			/>
		</>
	);
}
