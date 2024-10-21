import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";
import ModalWrapper from "@/Components/ModalWrapper";
import UploadModal from "@/Components/UploadModal";
import {
	Avatar,
	Box,
	Button,
	Divider,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Correct Grid2 import from MUI
import { useState } from 'react';

export default function ProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");

  const [modalState, setModalState] = useState<"delete" | "upload" | null>(
    null
  );

  const openModal = (type: "delete" | "upload") => {
    setModalState(type);
  };

  const closeModal = () => setModalState(null);

	const handleSave = () => {
		console.log('Profile Updated Successfully!');
	};

	const handleDelete = () => {
		console.log('Account Deleted Successfully!');
	};

	return (
		<Box component="form" noValidate autoComplete="off">
			<Grid
				container
				rowSpacing={14}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				alignItems="center">
				{/* First Name */}
				<Grid size={6}>
					<Typography variant="h2">First name</Typography>
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
					<Typography variant="h2">Last name</Typography>
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
					<Typography variant="h2">Email</Typography>
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
					<Typography variant="h2">Your photo</Typography>
					<Typography variant="subtitle1">
						This photo will be displayed on your profile page.
					</Typography>
				</Grid>
				<Grid size={6}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						<Avatar
							alt="Profile Picture"
							src="https://picsum.photos/200/200"
							sx={{ width: 56, height: 56, mr: 7 }}
						/>
						<Link
							href="#"
							underline="hover"
							sx={{ px: 4, color: 'text.secondary' }}>
							Delete
						</Link>
						<Link
							href="#"
							underline="hover"
							sx={{ px: 4, color: 'text.brand' }}>
							Update
						</Link>
					</Box>
				</Grid>
			</Grid>

			{/* Save Button */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 40 }}>
				<Button
					variant="contained"
					size="medium"
					color="primary"
					onClick={handleSave}>
					Save
				</Button>
			</Box>

			<Divider sx={{ mb: 7, mt: 14 }} />

			{/* Delete Account Section */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					mb: 4,
					rowGap: 6,
				}}>
				<Typography variant="h2" fontWeight="bold">
					Delete account
				</Typography>
				<Typography variant="subtitle1" sx={{ mb: 2 }}>
					Note that deleting your account will remove all data from our system.
					This is permanent and non-recoverable.
				</Typography>

				{/* Delete Account Button */}
				<Box sx={{ justifyContent: 'flex-start' }}>
					<Button
						variant="contained"
						size="medium"
						color="error"
						onClick={handleDelete}>
						Delete account
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
