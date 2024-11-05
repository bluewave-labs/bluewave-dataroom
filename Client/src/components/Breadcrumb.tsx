'use client';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import NavLink from './NavLink';

const Breadcrumb = () => {
	const pathname = usePathname();

	const iconMap: { [key: string]: string } = {
		home: '/assets/icons/breadcrumb/breadcrumb-home-icon.svg',
		documents: '/assets/icons/sidebar/sidebar-documents-icon.svg',
		contacts: '/assets/icons/sidebar/sidebar-contacts-icon.svg',
		settings: '/assets/icons/sidebar/sidebar-settings-icon.svg',
		profile: '/assets/icons/sidebar/sidebar-profile-icon.svg',
		team: '/assets/icons/sidebar/sidebar-team-icon.svg',
	};

	const pathnames = pathname.split('/').filter((x) => x);

	// Helper function to render icon + text
	const renderBreadcrumb = (label: string, href: string, isLast: boolean) => {
		const iconSrc = iconMap[label.toLowerCase()];
		return (
			<Box key={href} display="flex" alignItems="center">
				{iconSrc && <Image src={iconSrc} alt={`${label} icon`} width={20} height={20} />}
				{isLast ? (
					<Typography variant="body1" color="text.notes" sx={{ ml: 3 }}>
						{label.charAt(0).toUpperCase() + label.slice(1)}
					</Typography>
				) : (
					<NavLink
						href={href}
						color="text.primary"
						variant="body1"
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
	}, [pathnames, renderBreadcrumb]);

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			separator={<NavigateNextIcon fontSize="small" />}
			sx={{ marginBottom: '1rem' }}>
			<Box display="flex" alignItems="center">
				<Image src={iconMap['home']} alt="Home Icon" width={20} height={20} />
				<NavLink href="/" color="text.primary" variant="body1" sx={{ ml: 3 }} linkText="Home" />
			</Box>
			{breadcrumbs}
		</Breadcrumbs>
	);
};

export default Breadcrumb;
