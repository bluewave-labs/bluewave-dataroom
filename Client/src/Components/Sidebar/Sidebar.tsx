'use client';

import { Box, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Image from 'next/image';
import Link from 'next/link';

import ContactsIcon from '../../../public/assets/icons/sidebar/sidebar-contacts-icon.svg';
import DocumentsIcon from '../../../public/assets/icons/sidebar/sidebar-documents-icon.svg';
import SettingsIcon from '../../../public/assets/icons/sidebar/sidebar-settings-icon.svg';
import Title from '../../../public/assets/icons/sidebar/sidebar-title.svg';
import DropdownMenu from './DropdownMenu';

export default function Sidebar() {
	const menuItems: { [key: string]: string } = {
		Documents: DocumentsIcon,
		Contacts: ContactsIcon,
		Settings: SettingsIcon,
	};

	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			sx={{
				backgroundColor: 'white',
				paddingBottom: '1rem',
				paddingTop: '2rem',
				paddingX: '1rem',
				borderRight: '1.5px solid #EBEBEB',
			}}>
			<Box>
				<Image src={Title} alt="Title" style={{ margin: '0 8px 16px 8px' }} />
				<List>
					{['Documents', 'Contacts', 'Settings'].map((text) => (
						<ListItem
							key={text}
							disablePadding
							sx={{
								'&:hover': { backgroundColor: '#f5f9ff' },
								borderRadius: 4,
							}}>
							<Link href={`/${text.toLowerCase()}`} className="no-styling">
								<ListItemButton
									disableRipple
									sx={{
										'&:hover': { backgroundColor: '#f5f9ff' },
									}}>
									<ListItemIcon sx={{ minWidth: 0, paddingRight: '1rem' }}>
										<Image src={menuItems[text]} alt={text} height={24} />
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
