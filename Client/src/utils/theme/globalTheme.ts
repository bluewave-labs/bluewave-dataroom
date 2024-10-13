'use client';

import { createTheme } from '@mui/material';
import { PaletteOptions, styled } from '@mui/material/styles';

const text = {
	primary: '#344054',
	secondary: '#5D6B98',
	tertiary: '#475467',
	notes: '#A1AFC6',
	brand: '#1570EF',
};

const background = {
	content: '#fcfcfd',
	alt: '#dceaf5',
	brand: '#1570EF',
	fill: '#FCFCFD',
	error: '#DB504A',
	secondary: '#F9FAFB',
	errorDark: '#D92D20',
	primaryDark: '#175CD3',
};

const border = { light: '#EBEBEB', dark: '#CCCCCC' };

const fontFamilyDefault =
	'"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow =
	'0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)';

const globalTheme = createTheme({
	spacing: 2,
	typography: {
		fontFamily:
			'"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
		fontSize: 13,
		h1: { fontSize: 16, color: text.primary, fontWeight: 600 },
		h2: { fontSize: 13, color: text.primary, fontWeight: 600 },
		h3: { fontSize: 11, color: text.primary, fontWeight: 600 },
		body1: { fontSize: 11, color: text.tertiary, fontWeight: 400 },
		body2: { fontSize: 11, color: text.notes, fontWeight: 400 },
		caption: {
			fontSize: 11,
			color: text.notes,
			fontWeight: 400,
			lineHeight: '20px',
			textAlign: 'left',
		},
	},
	palette: {
		primary: {
			main: text.brand, // Using brand color for primary
		},
		secondary: {
			main: background.secondary, // Light secondary background
		},
		error: {
			main: background.error,
			contrastText: '#FFFFFF',
		},
		text: text, // Reuse text constants
		background: background as PaletteOptions['background'], // Reuse background constants
		border: {
			light: '#EBEBEB',
			dark: '#CCCCCC', // Updated dark to a common grey color for potential use
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					lineHeight: 'inherit',
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					paddingLeft: '0 !important',
					paddingRight: '0 !important',
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					fontWeight: 400,
					borderRadius: 4,
					boxShadow: 'none',
					textTransform: 'none',
					padding: '0.3rem 1rem',
					'&:focus': {
						outline: 'none',
					},
					'&:hover': {
						boxShadow: 'none',
					},
				},
				sizeLarge: {
					padding: '0.4rem 2rem',
				},
				sizeMedium: {
					// Placeholder for medium size
					padding: '10px 20px',
					fontSize: '0.75rem',
				},
				sizeSmall: {
					// Placeholder for small size
					padding: '6px 12px',
					fontSize: '0.6rem',
				},
				containedPrimary: {
					backgroundColor: background.brand,
					color: '#FFFFFF',
					border: `1px solid ${background.primaryDark}`,
					'&:hover': {
						backgroundColor: background.primaryDark,
						borderColor: background.primaryDark,
					},
				},
				containedError: {
					backgroundColor: background.error,
					color: '#FFFFFF',
					border: `1px solid ${background.errorDark}`,
					'&:hover': {
						backgroundColor: background.errorDark,
						borderColor: background.errorDark,
					},
				},
				containedSecondary: {
					backgroundColor: background.secondary,
					color: text.tertiary,
					border: `1px solid ${border.light}`,
					'&:hover': {
						backgroundColor: '#E5E7EB',
						borderColor: '#D1D5DB',
					},
				},
				outlinedSecondary: {
					color: text.tertiary,
					backgroundColor: background.fill,
					border: `1px solid ${border.light}`,
					':hover': {
						backgroundColor: background.secondary,
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 4,
					transition: 'none',
					'&:hover': {
						backgroundColor: background.fill,
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					marginTop: 4,
					padding: 0,
					border: 1,
					borderStyle: 'solid',
					borderColor: border.light,
					borderRadius: 4,
					boxShadow: shadow,
					backgroundColor: background.content,
					backgroundImage: 'none',
				},
			},
		},

		MuiList: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					transition: 'none',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					borderRadius: '0.5rem',
					padding: '0.8rem 1rem',
					boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.1)',
				},
				icon: {
					right: '0.5rem',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: '#FFFFFF',
				},
				input: {
					backgroundColor: '#FFFFFF',
					'&.Mui-disabled': {
						backgroundColor: '#F9F9F9',
						cursor: 'not-allowed',
					},
				},
			},
		},

		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: '0.5rem',
					marginTop: '0.5rem',
					'& .MuiMenu-list': {
						paddingTop: 0,
						paddingBottom: 0,
						'& li': {
							paddingTop: '0.5rem',
							paddingBottom: '0.5rem',
						},

						'& li.Mui-selected': {
							color: '#fff',
							backgroundColor: background.brand,
						},
					},
				},
			},
		},

		MuiMenuItem: {
			styleOverrides: {
				root: {
					backgroundColor: 'inherit',
					padding: '4px 6px',
					color: text.secondary,
					fontSize: 13,
					minWidth: 100,
					'&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
						backgroundColor: background.alt, // Use theme colors
					},
					'&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible':
						{
							backgroundColor: background.alt,
						},
				},
			},
		},

		MuiTableContainer: {
			styleOverrides: {
				root: {
					overflow: 'visible',
					boxShadow: 'none',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: 14,
					color: 'inherit',
				},
				head: {
					color: 'rgba(161, 175, 198)',
					fontSize: 11,
					paddingX: '0.5rem',
					paddingBottom: '0.6rem',
					paddingTop: '0.6rem',
				},
				body: {
					padding: '1rem',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {},
				hover: {
					'&:hover': {
						backgroundColor: '#f5f5f5', // Custom hover color for rows
					},
				},
			},
		},
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					'& .MuiTableSortLabel-icon': {
						opacity: 1, // Ensure visibility of sort icons
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: '4px',
				},
				colorSecondary: {
					backgroundColor: '#F9FAFB',
					color: '#344054',
					border: '1.5px solid #EAECF0',
					'& .MuiChip-icon': {
						color: '#939393',
						marginRight: '2px',
					},
				},
			},
		},

		MuiAlert: {
			styleOverrides: {
				root: {
					'&.MuiAlert-standardWarning': {
						fontSize: '1rem',
						color: '#DC6803',
						border: '2px solid #FEC84B',
						'& .MuiAlert-icon': {
							fontSize: '1.5rem',
						},
					},
				},
			},
		},
		MuiPaginationItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: '#F0F2F5',
						color: '#000000',

						'&:hover': {
							backgroundColor: '#F0F2F5',
						},
					},
				},
			},
		},
	},
	shape: {
		borderRadius: 2,
		borderThick: 2,
		boxShadow: shadow,
	},
});

export default globalTheme;
