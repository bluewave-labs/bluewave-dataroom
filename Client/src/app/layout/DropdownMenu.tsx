import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';

import LogOutIcon from '../../../public/assets/icons/sidebar/LogOutIcon';
import ProfileIcon from '../../../public/assets/icons/sidebar/ProfileIcon';
import TeamIcon from '../../../public/assets/icons/sidebar/TeamIcon';
import DropdownArrow from '../../../public/assets/icons/sidebar/sidebar-arrow-acc-icon.svg';

export default function DropdownMenu() {
	const router = useRouter();
	const { data: session } = useSession();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// Extract first/last name from the session
	const firstName = session?.user?.firstName || ''; // or parse from session?.user?.name
	const lastName = session?.user?.lastName || ''; // or parse from session?.user?.name
	const fullName = `${firstName} ${lastName}`.trim() || 'No Name';

	console.log('🚀 ~ DropdownMenu ~ fullName:', fullName);
	const menuItems = [
		{ text: 'Profile', icon: <ProfileIcon />, href: '/profile' },
		{ text: 'Team', icon: <TeamIcon />, href: '/team' },
	];

	return (
		<Box>
			<Button
				onClick={handleClick}
				size='medium'
				sx={{
					color: 'text.primary',
					fontSize: 16,
					textTransform: 'capitalize',
				}}
				startIcon={
					<Avatar
						src={'' /* Add avatarUrl */}
						sx={{ bgcolor: 'background.primary' }}>
						{`${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()}
					</Avatar>
				}
				endIcon={
					<Box
						component='img'
						src={DropdownArrow.src}
						alt='Dropdown Arrow'
						sx={{
							width: 20,
							height: 20,
							transform: open ? 'rotate(-180deg) translateY(-2px)' : 'rotate(0deg) translateY(0)',
							transition: 'transform 0.4s ease-in-out',
						}}
					/>
				}>
				{fullName}
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				sx={{
					mt: -10,
					mr: 2,
					borderRadius: 2,
					'& .MuiMenuItem-root': {
						py: 7,
						px: 10,
					},
				}}>
				{menuItems.map(({ text, icon, href }) => (
					<Link
						key={text}
						href={href}
						style={{ textDecoration: 'none', color: 'inherit' }}>
						<MenuItem
							onClick={handleClose}
							sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							{icon}
							<Typography variant='body1'>{text}</Typography>
						</MenuItem>
					</Link>
				))}

				<MenuItem
					onClick={() => {
						handleClose();
						signOut();
						router.push('/');
					}}
					sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
					<LogOutIcon />
					<Typography variant='body1'>Log Out</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
}
