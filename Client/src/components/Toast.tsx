import { Box, IconButton, Snackbar, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { dummyToasts } from '@/data/dummyToasts';

export interface ToastData {
	id: number;
	variant: 'successful' | 'error' | 'warning' | 'info';
	color: string;
	backgroundColor: string;
}

interface ToastProps {
	variant: 'successful' | 'error' | 'warning' | 'info';
	message: string;
	toastLink?: string;
	toggleToast: (show: boolean) => void;
	showToast: boolean;
}

export default function Toast({ variant, message, toastLink, toggleToast, showToast }: ToastProps) {
	// Find the matching toast object based on the passed variant
	const currentToast = dummyToasts.find((toast) => toast.variant === variant);

	const handleClose = () => {
		toggleToast(false);
	};
	const action = (
		<IconButton
			onClick={handleClose}
			sx={{
				color: currentToast?.color,
				'&:hover': {
					backgroundColor: 'transparent',
				},
			}}>
			<CloseIcon fontSize="small" />
		</IconButton>
	);
	return (
		<Box>
			<Snackbar
				open={showToast}
				autoHideDuration={6000}
				onClose={handleClose}
				message={
					<>
						{message}{' '}
						{toastLink && (
							<Link href="#" underline="hover">
								{toastLink}
							</Link>
						)}
					</>
				}
				action={action}
				sx={{
					'& .MuiSnackbarContent-message': { fontSize: 13 },
					'& .MuiSnackbarContent-root': {
						borderRadius: 2.5,
						color: currentToast?.color,
						backgroundColor: currentToast?.backgroundColor,
						...(variant !== 'info' && {
							border: 'none',
							borderLeft: 5,
							borderLeftColor: currentToast?.color,
						}),
					},
				}}
			/>
		</Box>
	);
}
