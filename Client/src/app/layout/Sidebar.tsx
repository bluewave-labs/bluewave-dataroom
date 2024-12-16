'use client';

import Link from 'next/link';

import { Box, Drawer, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import BlueWaveLogo from '../../../public/assets/BluewaveLogo';
import ContactsIcon from '../../../public/assets/icons/sidebar/ContactsIcon';
import DocumentsIcon from '../../../public/assets/icons/sidebar/DocumentsIcon';
import SettingsIcon from '../../../public/assets/icons/sidebar/SettingsIcon';
import DropdownMenu from './DropdownMenu';
import { useState } from 'react';

export default function Sidebar() {
	const [selectedListItem, setSelectedListItem] = useState('');

	const menu = [
		{ text: 'Documents', icon: <DocumentsIcon />, href: '/documents' },
		{ text: 'Contacts', icon: <ContactsIcon />, href: '/contacts' },
		{ text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
	];

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: '15rem',
			}}>
			<Stack
				justifyContent='space-between'
				direction='column'
				sx={{
					height: '100vh',
					backgroundColor: 'background.fill',
					pt: { sx: 4, sm: 8, md: 16 },
					pb: { sx: 2, sm: 4, md: 10 },
					px: { sx: 2, sm: 4, md: 8 },
					border: 1,
					borderColor: 'border.light',
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: { sx: 4, sm: 10, md: 21 },
						mx: { sx: 2, sm: 2, md: 5 },
					}}>
					<BlueWaveLogo
						width={191}
						height={24}
					/>

					<List>
						{menu.map(({ text, icon, href }) => (
							<ListItem
								key={text}
								disablePadding>
								<Link
									href={href}
									style={{
										textDecoration: 'none',
										color: 'inherit',
										width: '100%',
									}}>
									<ListItemButton
										selected={selectedListItem === text}
										onClick={() => setSelectedListItem(text)}
										sx={{
											px: 4,
											borderLeft: 3,
											borderLeftColor: 'transparent',
											'&.Mui-selected': {
												borderLeftColor: 'background.primary',
											},
										}}>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</Link>
							</ListItem>
						))}
					</List>
				</Box>
				<DropdownMenu />
			</Stack>
		</Drawer>
	);
}
