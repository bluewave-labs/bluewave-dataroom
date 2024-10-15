'use client';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';

import './dropdownMenu.css';

const dropdownArrowSrc = '/assets/icons/sidebar/sidebar-arrow-acc-icon.svg';
const avatarSrc = '/assets/icons/sidebar/sidebar-avatar-icon.svg';
const profileSrc = '/assets/icons/sidebar/sidebar-profile-icon.svg';
const logOutSrc = '/assets/icons/sidebar/sidebar-log-out-icon.svg';
const teamSrc = '/assets/icons/sidebar/sidebar-team-icon.svg';

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
		boxShadow: theme.customShadows?.menu,
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

	const menuItems: { [key: string]: string } = {
		Profile: profileSrc,
		Team: teamSrc,
		Logout: logOutSrc,
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
					<Image src={avatarSrc} alt="Avatar" width={24} height={24} />
				}
				endIcon={
					<Image
						src={dropdownArrowSrc}
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
						href={`/${text.toLowerCase()}`}
						key={text}
						className="no-styling">
						<MenuItem onClick={handleClose}>
							<Image
								src={
									menuItems[
										text.includes(' ') ? text.replace(/\s+/g, '') : text
									]
								}
								alt={text}
								height={16}
								width={16}
								className="icon-mr"
							/>
							{text}
						</MenuItem>
					</Link>
				))}
			</StyledMenu>
		</Box>
	);
}
