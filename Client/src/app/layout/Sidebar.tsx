'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
} from '@mui/material';

import BlueWaveLogo from '../../../public/assets/BluewaveLogo';
import ContactsIcon from '../../../public/assets/icons/sidebar/ContactsIcon';
import DocumentsIcon from '../../../public/assets/icons/sidebar/DocumentsIcon';
import SettingsIcon from '../../../public/assets/icons/sidebar/SettingsIcon';

import DropdownMenu from './DropdownMenu';

export default function Sidebar() {
	const pathname = usePathname();
	const menuItems = [
		{ text: 'Documents', icon: <DocumentsIcon />, href: '/documents' },
		{ text: 'Contacts', icon: <ContactsIcon />, href: '/contacts' },
		{ text: 'Settings', icon: <SettingsIcon />, href: '/settings' },
	];

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: { sm: '14rem', md: '16rem', lg: '18rem' },
				'& .MuiDrawer-paper': {
					width: { sm: '14rem', md: '16rem', lg: '18rem' },
					boxSizing: 'border-box',
				},
			}}>
			<Stack
				justifyContent='space-between'
				sx={{
					height: '100vh',
					backgroundColor: 'background.fill',
					pt: { xs: 4, sm: 8, md: 16 },
					pb: { xs: 2, sm: 4, md: 10 },
					px: { xs: 2, sm: 4, md: 10 },
					borderRight: 1,
					borderColor: 'border.light',
				}}>
				{/* Top Section */}
				<Box
					display='flex'
					flexDirection='column'
					gap={4}>
					<Box sx={{ mx: 'auto', mt: 2 }}>
						<BlueWaveLogo
							width={191}
							height={24}
						/>
					</Box>

					<List>
						{menuItems.map(({ text, icon, href }) => {
							const isActive = pathname === href;
							return (
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
											selected={isActive}
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
							);
						})}
					</List>
				</Box>

				{/* Bottom Section - DropdownMenu */}
				<DropdownMenu />
			</Stack>
		</Drawer>
	);
}
