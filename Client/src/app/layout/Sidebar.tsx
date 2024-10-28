'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Box, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ContactsIcon from '../../../public/assets/icons/sidebar/sidebar-contacts-icon.svg';
import DocumentsIcon from '../../../public/assets/icons/sidebar/sidebar-documents-icon.svg';
import SettingsIcon from '../../../public/assets/icons/sidebar/sidebar-settings-icon.svg';
import Title from '../../../public/assets/icons/sidebar/sidebar-title.svg';
import DropdownMenu from './DropdownMenu';

export default function Sidebar() {
	const menu = [
		{ text: 'Documents', icon: DocumentsIcon, href: '/documents' },
		{ text: 'Contacts', icon: ContactsIcon, href: '/contacts' },
		{ text: 'Settings', icon: SettingsIcon, href: '/settings' },
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
			<Box>
				<Image
					src={Title}
					alt="Title"
					style={{
						margin: '0 4px 16px',
					}}
				/>
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
										<Image src={icon} alt={text} height={24} width={24} />
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
