'use client';
import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import ColorPickerBox from './ColorPickerBox';

export default function BrandingSetting() {
	const deleteModal = useModal();
	const uploadModal = useModal();

	const handleDelete = () => {
		console.log('Logo Deleted');
	};

	const handleSave = () => {
		console.log('Update successful!');
	};
	const handleUpdate = () => {
		console.log('Logo Update successful!');
	};

	return (
		<>
			<Box>
				<Box mb={16}>
					<Typography variant="subtitle2">
						Customize how your brand appears to the public across DataRoom documents your visitors
						see.
					</Typography>
				</Box>
				<Box display="flex">
					<Typography variant="h3" mr={174}>
						Logo
					</Typography>

					<Box display="flex" alignItems="center">
						{/* Edit Icon on hover */}
						<Box
							sx={{
								position: 'relative',
								width: 86,
								height: 86,
								mr: 9,
								borderRadius: '50%',
								overflow: 'hidden',
								'&:hover .avatar-edit-icon': {
									opacity: 1,
								},
							}}>
							<Avatar
								sx={{
									width: '100%',
									height: '100%',
									backgroundColor: '#EDEEF1',
									color: 'text.brand',
									fontSize: 47,
									fontWeight: 600,
									cursor: 'pointer',
								}}>
								BU
							</Avatar>

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
								<EditIcon fontSize="large" />
							</Box>
						</Box>

						{/* Delete and Update Links */}
						<Link
							href="#"
							underline="hover"
							sx={{ px: 4, color: 'text.secondary' }}
							onClick={deleteModal.openModal}>
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
				</Box>
				<Box display="flex" mt={20}>
					<Typography variant="h3" mr={138}>
						Background color
					</Typography>
					<ColorPickerBox />
				</Box>
				<Box display="flex" mt={14}>
					<Typography variant="h3" mr={160}>
						Font color
					</Typography>
					<ColorPickerBox />
				</Box>
				<Box ml={330} mt={70}>
					<Button variant="contained" onClick={handleSave}>
						Save
					</Button>
				</Box>
			</Box>

			<ModalWrapper
				variant="delete"
				title="Really delete this logo?"
				description="When you delete this logo, all the links associated with the logo will also be removed. This action is non-reversible."
				confirmButtonText="Delete logo"
				open={deleteModal.isOpen}
				onClose={handleDelete}
				toggleModal={deleteModal.closeModal}
			/>

			<ModalWrapper
				variant="upload"
				title="Upload logo"
				confirmButtonText="Update"
				open={uploadModal.isOpen}
				onClose={handleUpdate}
				maxFileSize="3"
				fileFormats="JPG, PNG"
				toggleModal={uploadModal.closeModal}
			/>
		</>
	);
}
