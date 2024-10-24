'use client';
import { Box, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

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

	const theme = useTheme();
	const menu: string[] = ['Documents', 'Contacts', 'Settings'];

	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			sx={{
				maxHeight: '100vh',
				mt: -16,
				mb: -12,
				ml: -4,
				pt: 16,
				pb: 12,
				pl: 8,
				pr: 8,
				border: `1px solid ${theme.palette.border.light}`,
			}}>
			<Box>
				<Image
					src={Title}
					alt="Title"
					style={{
						margin: `0 ${theme.spacing(4)} ${theme.spacing(16)} ${theme.spacing(
							4
						)}`,
					}}
				/>
				<List>
					{menu.map((text) => (
						<ListItem key={text} disablePadding>
							<Link
								href={`/${text.toLowerCase()}`}
								className="no-styling width-area">
								<ListItemButton
									sx={{
										px: 4,
										'&:hover': {
											backgroundColor: theme.palette.background.alt,
										},
									}}>
									<ListItemIcon>
										<Image
											src={menuItems[text]}
											alt={text}
											height={24}
											width={24}
										/>
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
