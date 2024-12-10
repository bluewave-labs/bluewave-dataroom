import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton, Snackbar } from '@mui/material';
import { ReactNode } from 'react';
import NavLink from './NavLink';
import { ToastVariant } from '@/providers/toast/toastTypes';

interface BaseToastProps {
	variant?: ToastVariant;
	autoHide?: boolean;
}

type ToastWithMessage = BaseToastProps & {
	message: string;
	toastLink?: string;
	toastLinkText?: string;
	children?: never;
};

type ToastWithChildren = BaseToastProps & {
	children: ReactNode;
	message?: never;
	toastLink?: never;
	toastLinkText?: never;
};

type ToastProps = ToastWithMessage | ToastWithChildren;

export default function Toast({
	variant = 'info',
	message,
	toastLink,
	toastLinkText = 'Learn more',
	autoHide = true,
	open,
	hideToast,
	children,
}: ToastProps & { open: boolean; hideToast: () => void }) {
	const action = (
		<IconButton onClick={hideToast}>
			<CloseIcon fontSize='small' />
		</IconButton>
	);

	return (
		<Box>
			<Snackbar
				open={open}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				autoHideDuration={autoHide ? 6000 : null}
				onClose={hideToast}
				action={action}>
				<Alert
					onClose={hideToast}
					icon={false}
					variant='standard'
					severity={variant}>
					{message ? (
						<Box
							component='span'
							display='inline-flex'
							alignItems='center'
							gap={5}>
							{message}{' '}
							{toastLink && (
								<NavLink
									href={toastLink}
									linkText={toastLinkText}
								/>
							)}
						</Box>
					) : (
						children
					)}
				</Alert>
			</Snackbar>
		</Box>
	);
}
