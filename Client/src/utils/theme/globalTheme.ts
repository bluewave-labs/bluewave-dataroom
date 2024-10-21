'use client';

import { createTheme } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

const text = {
	primary: '#344054',
	secondary: '#475467',
	tertiary: '#FFFFFF',
	notes: '#A1AFC6',
	brand: '#1570EF',
};

const background = {
	content: '#fcfcfd',
	alt: '#F5F9FF',
	brand: '#1570EF',
	fill: '#FFFFFF',
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
const modalShadow =
	'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px';

const globalTheme = createTheme({
	// spacing: (factor: number) => `${0.125 * factor}rem`,
	spacing: 2,
	typography: {
		fontFamily: fontFamilyDefault,
		fontSize: 13,
		h1: { fontSize: 20, color: text.brand, fontWeight: 600 },
		h2: { fontSize: 17, color: text.primary, fontWeight: 600 },
		h3: { fontSize: 13, color: text.primary, fontWeight: 600 },
		h4: { fontSize: 11, color: text.primary, fontWeight: 600 },
		body1: { fontSize: 14, color: text.secondary, fontWeight: 400 },
		body2: { fontSize: 11, color: text.notes, fontWeight: 400 },
		subtitle1: { fontSize: 13, color: text.notes, fontWeight: 400 },
		subtitle2: { fontSize: 13, color: text.secondary, fontWeight: 400 }, //Unused Currently
		caption: {
			fontSize: 11,
			fontWeight: 400,
			color: text.notes,
			lineHeight: '20px',
			textAlign: 'left',
		},
		// h1: { fontSize: '1rem', color: text.brand, fontWeight: 600 },
		// h2: { fontSize: '0.8rem', color: text.primary, fontWeight: 600 },
		// h3: { fontSize: '0.7rem', color: text.primary, fontWeight: 600 },
		// body1: { fontSize: '0.85rem', color: text.secondary, fontWeight: 400 },
		// body2: { fontSize: '0.8rem', color: text.notes, fontWeight: 400 },
		// subtitle1: { fontSize: '0.8rem', color: text.notes, fontWeight: 400 },
		// subtitle2: { fontSize: '0.8rem', color: text.secondary, fontWeight: 400 },
		// caption: {
		// 	fontSize: '0.7rem',
		// 	fontWeight: 400,
		// 	color: text.notes,
		// 	lineHeight: '20px',
		// 	textAlign: 'left',
		// },
	},
	customShadows: {
		menu: modalShadow,
	},
	palette: {
		primary: {
			main: text.brand,
		},
		secondary: {
			main: background.secondary,
		},
		error: {
			main: background.error,
			contrastText: text.tertiary,
		},
		text: text,
		background: background as PaletteOptions['background'],
		border: {
			light: border.light,
			dark: border.dark,
		},
	},
	shape: {
		borderRadius: 2,
		borderThick: 2,
		boxShadow: shadow,
	},
	components: {
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
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 400,
					fontSize: 13,
					borderRadius: 4,
					boxShadow: 'none',
					textTransform: 'none',
					minWidth: '9rem',
					'&:focus': {
						outline: 'none',
					},
					'&:hover': {
						boxShadow: 'none',
					},
				},
				sizeLarge: {
					padding: '0.4rem 1.5rem',
					fontSize: 14,
				},
				sizeMedium: {
					padding: '0.4rem 1rem',
				},
				sizeSmall: {
					padding: '0.3rem 0.8rem',
					minWidth: '7rem',
					fontSize: 12,
				},
				containedPrimary: {
					backgroundColor: background.brand,
					color: text.tertiary,
					border: `1px solid ${background.primaryDark}`,
					'&:hover': {
						backgroundColor: background.primaryDark,
						borderColor: background.primaryDark,
					},
				},
				containedSecondary: {
					backgroundColor: background.secondary,
					color: text.secondary,
					border: `1px solid ${border.light}`,
					'&:hover': {
						backgroundColor: '#1570ef0a',
						borderColor: '#D1D5DB',
					},
				},
				containedError: {
					backgroundColor: background.error,
					color: text.tertiary,
					border: `1px solid ${background.errorDark}`,
					'&:hover': {
						backgroundColor: background.errorDark,
						borderColor: background.errorDark,
					},
				},
				outlinedSecondary: {
					color: text.secondary,
					backgroundColor: background.fill,
					border: `1px solid ${border.light}`,
					':hover': {
						backgroundColor: background.secondary,
					},
				},
				textSecondary: {
					color: text.primary,
					backgroundColor: 'transparent',
					'&:hover': {
						backgroundColor: '#1570ef0a',
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 2,
				},
				colorSecondary: {
					backgroundColor: background.secondary,
					color: text.primary,
					border: '1.5px solid #EAECF0',
					'& .MuiChip-icon': {
						color: '#939393',
						marginRight: '2px',
					},
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
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					lineHeight: 'inherit',
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					maxWidth: 410,
					minWidth: 385,
					padding: 4,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 4,
					transition: 'none',
					'&:hover': {
						backgroundColor: '#1570ef0a',
					},
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
					borderRadius: 4,
					'&:hover': {
						backgroundColor: '#1570ef0a',
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: '0px',
					padding: '0 16px 0 0',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: 4,
					marginTop: '0.5rem',
					'& .MuiMenu-list': {
						paddingTop: 0,
						paddingBottom: 0,
						'& li': {
							paddingTop: '0.5rem',
							paddingBottom: '0.5rem',
						},
						'& li.Mui-selected': {
							color: text.tertiary,
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
					color: text.secondary,
					fontSize: 13,
					minWidth: 100,
					'&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible':
						{
							backgroundColor: background.alt,
						},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: background.fill,
				},
				input: {
					backgroundColor: background.fill,
					'&.Mui-disabled': {
						backgroundColor: '#F9F9F9',
						cursor: 'not-allowed',
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
		MuiSelect: {
			styleOverrides: {
				select: {
					borderRadius: 4,
					padding: '0.8rem 1rem',
					boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.1)',
				},
				icon: {
					right: '0.5rem',
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
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
					color: text.notes,
					fontSize: 12,
					fontWeight: '500',
					paddingX: '0.5rem',
					paddingBottom: '0.6rem',
					paddingTop: '0.6rem',
				},
				body: {
					padding: '0.6rem',
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
		MuiTableRow: {
			styleOverrides: {
				root: {},
				hover: {
					'&:hover': {
						backgroundColor: '#f5f5f5',
					},
				},
			},
		},
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					'& .MuiTableSortLabel-icon': {
						opacity: 1,
					},
				},
			},
		},
		MuiToggleButton: {
			styleOverrides: {
				root: {
					color: 'black',
					textTransform: 'none',
					padding: '0.25rem 1.25rem',
					'&.Mui-selected': {
						fontWeight: 'bold',
					},
				},
			},
		},
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					backgroundColor: 'white',
				},
			},
		},
	},
});

export default globalTheme;
