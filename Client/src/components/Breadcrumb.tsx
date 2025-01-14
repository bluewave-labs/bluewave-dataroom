'use client';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import NavLink from './NavLink';
import DocumentsIcon from '../../public/assets/icons/sidebar/DocumentsIcon';
import ContactsIcon from '../../public/assets/icons/sidebar/ContactsIcon';
import SettingsIcon from '../../public/assets/icons/sidebar/SettingsIcon';
import ProfileIcon from '../../public/assets/icons/sidebar/ProfileIcon';
import TeamIcon from '../../public/assets/icons/sidebar/TeamIcon';
import HomeIcon from '../../public/assets/icons/breadcrumb/HomeIcon';

const Breadcrumb = () => {
	const pathname = usePathname();

	const iconMap: { [key: string]: React.ReactNode } = {
		documents: (
			<DocumentsIcon
				width={20}
				height={20}
			/>
		),
		contacts: (
			<ContactsIcon
				width={20}
				height={20}
			/>
		),
		settings: (
			<SettingsIcon
				width={20}
				height={20}
			/>
		),
		profile: (
			<ProfileIcon
				width={20}
				height={20}
			/>
		),
		team: (
			<TeamIcon
				width={20}
				height={20}
			/>
		),
	};

	const pathnames = pathname.split('/').filter((x) => x);

	// Helper function to render icon + text
	const renderBreadcrumb = (label: string, href: string, isLast: boolean) => {
		const icon = iconMap[label.toLowerCase()];
		return (
			<Box
				key={href}
				display='flex'
				alignItems='center'>
				{icon}
				{isLast ? (
					<Typography
						variant='subtitle1'
						ml={3}>
						{label.charAt(0).toUpperCase() + label.slice(1)}
					</Typography>
				) : (
					<NavLink
						href={href}
						color='text.primary'
						variant='body1'
						sx={{ ml: 3 }}
						linkText={label.charAt(0).toUpperCase() + label.slice(1)}
					/>
				)}
			</Box>
		);
	};

	const breadcrumbs = useMemo(() => {
		return pathnames.map((value, index) => {
			const isLast = index === pathnames.length - 1;
			const href = `/${pathnames.slice(0, index + 1).join('/')}`;
			return renderBreadcrumb(value, href, isLast);
		});
	}, [pathnames]);

	return (
		<Breadcrumbs
			aria-label='breadcrumb'
			separator={<NavigateNextIcon fontSize='small' />}
			sx={{ mb: '1rem' }}>
			<Box
				display='flex'
				alignItems='center'>
				<HomeIcon
					width={20}
					height={20}
				/>
				<NavLink
					href='/'
					color='text.primary'
					variant='body1'
					ml={3}
					linkText='Home'
				/>
			</Box>
			{breadcrumbs}
		</Breadcrumbs>
	);
};

export default Breadcrumb;
