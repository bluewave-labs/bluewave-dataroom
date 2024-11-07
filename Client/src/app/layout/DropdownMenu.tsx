import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DropdownArrow from '../../../public/assets/icons/sidebar/sidebar-arrow-acc-icon.svg';
import Avatar from '../../../public/assets/icons/sidebar/sidebar-avatar-icon.svg';

import LogOut from '../../../public/assets/icons/sidebar/sidebar-log-out-icon.svg';
import Profile from '../../../public/assets/icons/sidebar/sidebar-profile-icon.svg';
import Team from '../../../public/assets/icons/sidebar/sidebar-team-icon.svg';


export default function DropdownMenu() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const menu = [
		{ text: 'Profile', icon: Profile, href: '/profile' },
		{ text: 'Team', icon: Team, href: '/team' },
	];

	return (
		<Box>
			<Button
				disableElevation
				onClick={handleClick}
				size="medium"
				sx={{
					color: 'text.primary',
					fontSize: 14,
				}}
				startIcon={<Image src={Avatar} alt="Dropdown Arrow" width={24} height={24} />}
				endIcon={
					<Image
						src={DropdownArrow}
						alt="Dropdown Arrow"
						width={20}
						height={20}
						style={{
							marginLeft: 4,
							transform: anchorEl
								? 'rotate(-180deg) translateY(-2px)'
								: 'rotate(0deg) translateY(0)',
							transition: 'transform 0.4s ease-in-out',
						}}
					/>
				}>
				Account Name
			</Button>

			<Menu
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={{
					mt: -10,
					ml: 4,
					borderRadius: 2,
					'& .MuiMenuItem-root': {
						py: 7,
						pl: 10,
						pr: 34,
					},
				}}>
				{menu.map(({ text, icon, href }) => (
					<Link href={href} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
						<MenuItem onClick={handleClose}>
							{icon}
							<Typography variant="body1" ml="0.75rem">
								{text === 'Log out' ? <span onClick={() => signOut()}>{text}</span> : text}
							</Typography>
						</MenuItem>
					</Link>
				))}
				<div
					onClick={() => {
						signOut();
						router.push('/');
					}}>
					<MenuItem onClick={handleClose}>
						<Image
							src={LogOut}
							alt={LogOut}
							height={16}
							width={16}
							style={{ marginRight: '0.75rem' }}
						/>
						<Typography variant="body1">
							<span>Log Out</span>
						</Typography>
					</MenuItem>
				</div>
			</Menu>
		</Box>
	);
}
