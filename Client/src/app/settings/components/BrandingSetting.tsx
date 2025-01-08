'use client';
import ModalWrapper from '@/components/ModalWrapper';
import { useModal } from '@/hooks/useModal';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import ColorPickerBox from './ColorPickerBox';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

export default function BrandingSetting() {
	const deleteModal = useModal();
	const uploadModal = useModal();
	const { showToast } = useToast();

	const [loading, setLoading] = useState(false);

	const handleDelete = () => {
		console.log('Logo Deleted');
		showToast({
			message: 'Logo Deleted!',
			variant: 'error',
		});
	};

	const handleSave = () => {
		setLoading(true);

		setTimeout(() => {
			console.log('Settings Updated Successfully!');
			showToast({
				message: 'Settings Updated Successfully!',
				variant: 'success',
			});
			setLoading(false);
		}, 2000);
	};

	const handleUpdate = () => {
		console.log('Logo Updated Successfully!');
		showToast({
			message: 'Logo Updated Successfully!',
			variant: 'success',
		});
	};

	return (
		<>
			<Box>
				<Box mb={16}>
					<Typography variant='subtitle2'>
						Customize how your brand appears to the public across DataRoom documents your visitors
						see.
					</Typography>
				</Box>
				<Box>
					<Grid
						container
						rowSpacing={12}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						alignItems='center'>
						{/* Logo */}
						<Grid size={5}>
							<Typography variant='h4'>Logo</Typography>
						</Grid>
						<Grid size={7}>
							<Box
								display='flex'
								alignItems='center'>
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
										className='avatar-edit-icon'
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
										<EditIcon fontSize='large' />
									</Box>
								</Box>

								{/* Delete and Update Links */}
								<Link
									href='#'
									underline='hover'
									sx={{ px: 4, color: 'text.secondary' }}
									onClick={deleteModal.openModal}>
									Delete
								</Link>
								<Link
									href='#'
									underline='hover'
									sx={{ px: 4, color: 'text.brand' }}
									onClick={uploadModal.openModal}>
									Update
								</Link>
							</Box>
						</Grid>

						{/* Background color */}
						<Grid size={5}>
							<Typography variant='h4'>Background color</Typography>
						</Grid>
						<Grid size={7}>
							<ColorPickerBox />
						</Grid>

						{/* Font color */}
						<Grid size={5}>
							<Typography variant='h4'>Font color</Typography>
						</Grid>
						<Grid size={7}>
							<ColorPickerBox />
						</Grid>
						<Box
							width='100%'
							display='flex'
							justifyContent='flex-end'>
							<Button
								variant='contained'
								onClick={handleSave}
								disabled={loading}
								endIcon={
									loading ? (
										<CircularProgress
											size={20}
											color='inherit'
										/>
									) : null
								}>
								{loading ? 'Saving...' : 'Save'}
							</Button>
						</Box>
					</Grid>
				</Box>
			</Box>

			<ModalWrapper
				variant='delete'
				title='Really delete this logo?'
				description='When you delete this logo, all the links associated with the logo will also be removed. This action is non-reversible.'
				confirmButtonText='Delete logo'
				open={deleteModal.isOpen}
				onClose={handleDelete}
				toggleModal={deleteModal.closeModal}
			/>

			<ModalWrapper
				variant='upload'
				title='Upload logo'
				confirmButtonText='Update'
				open={uploadModal.isOpen}
				onClose={handleUpdate}
				maxFileSize='3 MB'
				fileFormats='JPG, PNG'
				toggleModal={uploadModal.closeModal}
			/>
		</>
	);
}
