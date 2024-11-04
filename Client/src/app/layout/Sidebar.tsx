'use client';

import Link from 'next/link';

import { Box, Stack } from '@mui/material';
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

export default function Sidebar() {
	const menu = [
		{ text: 'Documents', icon: <DocumentsIcon />, href: '/documents' },
		{ text: 'Contacts', icon: <ContactsIcon />, href: '/contacts' },
		{ text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
	];

	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			sx={{
				maxHeight: '100vh',
				backgroundColor: 'background.fill',
				mt: -16,
				mb: -12,
				ml: -4,
				pt: 16,
				pb: 12,
				px: 8,
				border: '1px solid',
				borderColor: 'border.light',
			}}>
			<Box display={'flex'} flexDirection={'column'} gap={21} mx={5}>
				<BlueWaveLogo width={191} height={24} />

				<List>
					{menu.map(({ text, icon, href }) => (
						<ListItem key={text} disablePadding>
							<Link
								href={href}
								style={{
									textDecoration: 'none',
									color: 'inherit',
									width: '100%',
								}}>
								<ListItemButton
									sx={{
										px: 4,
									}}>
									<ListItemIcon>
										<Box height={24} width={24} textAlign="center">
											{icon}
										</Box>
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
			<DropdownMenu />
		</Stack>
	);
}
