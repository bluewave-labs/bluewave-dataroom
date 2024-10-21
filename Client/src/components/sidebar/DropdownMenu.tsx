import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import './dropdownMenu.css';

import Image from 'next/image';
import Link from 'next/link';

import DropdownArrow from '../../../public/assets/icons/sidebar/sidebar-arrow-acc-icon.svg';
import Avatar from '../../../public/assets/icons/sidebar/sidebar-avatar-icon.svg';
import Profile from '../../../public/assets/icons/sidebar/sidebar-profile-icon.svg';
import LogOut from '../../../public/assets/icons/sidebar/sidebar-log-out-icon.svg';
import Team from '../../../public/assets/icons/sidebar/sidebar-team-icon.svg';
import { signOut } from 'next-auth/react';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		anchorOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		marginTop: theme.spacing(-4),
		boxShadow: theme.customShadows.menu,
		'& .MuiMenu-list': {
			padding: `${theme.spacing(2)} ${theme.spacing(7)}`,
		},
	},
}));

export default function DropdownMenu() {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function removeEmptySpace(text: string): string {
		return text.replace(/\s+/g, '');
	}

	const menuItems: { [key: string]: string } = {
		Profile: Profile,
		Team: Team,
		Logout: LogOut,
	};

	const menu: string[] = ['Profile', 'Team', 'Log out'];

	return (
		<Box>
			<Button
				disableElevation
				onClick={handleClick}
				size="small"
				className="no-styling"
				sx={{
					fontSize: theme.typography.body1,
					padding: theme.spacing(4),
					marginBottom: `-${theme.spacing(4)}`,
				}}
				startIcon={
					<Image src={Avatar} alt="Dropdown Arrow" width={24} height={24} />
				}
				endIcon={
					<Image
						src={DropdownArrow}
						alt="Dropdown Arrow"
						width={10}
						height={10}
					/>
				}>
				Account Name
			</Button>

			<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{menu.map((text) => (
					<Link
						href={text === 'Log out' ? '/api/auth/signout' : `${text.toLowerCase()}` }
						className="no-styling">
						<MenuItem onClick={handleClose}>
							<Image
								src={
									text.includes(' ')
										? menuItems[removeEmptySpace(text)]
										: menuItems[text]
								}
								alt={text}
								height={16}
								width={16}
								className="icon-mr"
							/>
							{text === 'Log out' ? (
								<span onClick={() => signOut()}>{text}</span>
							) : (
								text
							)}
						</MenuItem>
					</Link>
				))}
			</StyledMenu>
		</Box>
	);
}
