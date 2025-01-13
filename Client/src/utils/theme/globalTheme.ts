'use client';

import { createTheme } from '@mui/material';
import { PaletteOptions } from '@mui/material/styles';

const text = {
	primary: '#344054',
	secondary: '#475467',
	tertiary: '#FFFFFF',
	notes: '#A1AFC6',
	brand: '#1570EF',
	error: '#FF4747',
};

const background = {
	content: '#fcfcfd',
	alt: '#c1cee0',
	primary: '#1570EF',
	fill: '#FFFFFF',
	error: '#DB504A',
	secondary: '#F9FAFB',
};

const disabled = {
	primary: '#a6cbff',
	secondary: '#e9eaec',
	error: '#f5aaa6',
};

const hover = {
	tertiary: '#1570ef0a',
	secondary: '#e4ebf5f0',
	alt: '#edeff25f',
	error: '#D92D20',
	primary: '#175CD3',
};

const alert = {
	info: '#1570EF',
	infoLight: '#F5F9FF',
	warning: '#FEC84B',
	warningLight: '#fff4e5',
	error: '#DB504A',
	errorLight: '#fdeded',
	success: '#418944',
	successLight: '#edf7ed',
	default: '#FFFFFF',
};

const border = { light: '#EBEBEB', dark: '#CCCCCC' };

const fontFamilyDefault = '"Inter","system-ui", "Avenir", "Helvetica", "Arial", sans-serif';
const shadow = '0px 4px 24px -4px rgba(16, 24, 40, 0.08), 0px 3px 3px -3px rgba(16, 24, 40, 0.03)';
const modalShadow =
	'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px';

const globalTheme = createTheme({
	spacing: (factor: number) => `${0.125 * factor}rem`,
	// spacing: 2,
	typography: {
		fontFamily: fontFamilyDefault,
		fontSize: 13,
		// h1: { fontSize: 20, color: text.brand, fontWeight: 600 },
		// h2: { fontSize: 16, color: text.primary, fontWeight: 600 },
		// h3: { fontSize: 17, color: text.primary, fontWeight: 600 },
		// h4: { fontSize: 13, color: text.primary, fontWeight: 600 },
		// h5: { fontSize: 11, color: text.primary, fontWeight: 600 },
		// h6: { fontSize: 10, color: text.primary, fontWeight: 600 }, //Unused Currently
		// body1: { fontSize: 13, color: text.secondary, fontWeight: 400 },
		// body2: { fontSize: 11, color: text.notes, fontWeight: 400 },
		// subtitle1: { fontSize: 13, color: text.notes, fontWeight: 400 },
		// subtitle2: { fontSize: 13, color: text.secondary, fontWeight: 400 },
		// caption: {
		// 	fontSize: 11,
		// 	fontWeight: 400,
		// 	color: text.notes,
		// 	lineHeight: '20px',
		// 	textAlign: 'left',
		// },
		h1: { fontSize: '1.25rem', color: text.brand, fontWeight: 600 },
		h2: { fontSize: '1rem', color: text.primary, fontWeight: 600 },
		h3: { fontSize: '1.06rem', color: text.primary, fontWeight: 600 },
		h4: { fontSize: '0.8rem', color: text.primary, fontWeight: 600 },
		h5: { fontSize: '0.7rem', color: text.primary, fontWeight: 600 },
		h6: { fontSize: '0.65rem', color: text.primary, fontWeight: 600 }, //Unused Currently
		body1: { fontSize: '0.8rem', color: text.secondary, fontWeight: 400 },
		body2: { fontSize: '0.7rem', color: text.notes, fontWeight: 400 },
		subtitle1: { fontSize: '0.8rem', color: text.notes, fontWeight: 400 },
		subtitle2: { fontSize: '0.8rem', color: text.secondary, fontWeight: 400 },
		caption: {
			fontSize: '0.7rem',
			fontWeight: 400,
			color: text.notes,
			lineHeight: '20px',
			textAlign: 'left',
		},
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
		MuiAccordion: {
			styleOverrides: {
				root: {
					border: '0',
					boxShadow: 'none',
					marginY: '10px',
					'&:before': { content: 'none' },
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					backgroundColor: '#F6F6F6',
					borderRadius: '2px',
					maxWidth: 150,
					minHeight: '0 !important',
					'& .MuiAccordionSummary-content': {
						margin: '0 !important',
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
						border: `2px solid ${alert.warning}`,
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
					backgroundColor: background.primary,
					color: text.tertiary,
					border: `1px solid ${background.primary}`,
					'&:hover': {
						backgroundColor: hover.primary,
						borderColor: hover.primary,
					},
					'&.Mui-disabled': {
						backgroundColor: disabled.primary,
						color: text.tertiary,
						borderColor: disabled.primary,
					},
				},
				containedSecondary: {
					backgroundColor: background.secondary,
					color: text.secondary,
					border: `1px solid ${border.light}`,
					'&:hover': {
						backgroundColor: hover.tertiary,
						borderColor: hover.tertiary,
					},
					'&.Mui-disabled': {
						backgroundColor: disabled.secondary,
						color: text.notes,
						borderColor: disabled.secondary,
					},
				},
				containedError: {
					backgroundColor: background.error,
					color: text.tertiary,
					border: `1px solid ${background.error}`,
					'&:hover': {
						backgroundColor: hover.error,
						borderColor: hover.error,
					},
					'&.Mui-disabled': {
						backgroundColor: disabled.error,
						color: text.tertiary,
						borderColor: disabled.error,
					},
				},
				outlinedSecondary: {
					color: text.secondary,
					backgroundColor: background.fill,
					border: `1px solid ${border.light}`,
					':hover': {
						backgroundColor: background.secondary,
					},
					'&.Mui-disabled': {
						backgroundColor: disabled.secondary,
						color: text.notes,
						borderColor: disabled.secondary,
					},
				},

				textSecondary: {
					color: text.primary,
					backgroundColor: 'transparent',
					'&:hover': {
						backgroundColor: hover.tertiary,
					},
					'&.Mui-disabled': {
						backgroundColor: disabled.secondary,
						color: text.notes,
						borderColor: disabled.secondary,
					},
				},
			},
			defaultProps: {
				disableRipple: true, // Disable ripple effect for all buttons
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
						color: text.notes,
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
						backgroundColor: hover.tertiary,
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					borderRadius: 4,
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
						backgroundColor: hover.tertiary,
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
							backgroundColor: background.primary,
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
					'&:hover, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
						backgroundColor: hover.tertiary,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: background.fill,
					borderRadius: 4,
				},
				input: {
					backgroundColor: background.fill,
					'&.Mui-disabled': {
						backgroundColor: disabled.secondary,
						cursor: 'not-allowed',
					},
				},
			},
		},

		MuiPaginationItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: background.alt,
						color: text.primary,
						'&:hover': {
							backgroundColor: hover.secondary,
						},
					},
					'&:hover': {
						backgroundColor: hover.secondary,
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
				standard: {
					select: {
						borderRadius: 4,
						border: 'none',
						boxShadow: 'none',
					},
					icon: {
						right: '0.5rem',
					},
				},
				outlined: {
					select: {
						borderRadius: 4,
						border: '1px solid #00000030',
						boxShadow: '0px 0px 20px -10px rgba(0,0,0,0.1)',
					},
					icon: {
						right: '0.5rem',
					},
				},
			},
		},

		MuiSnackbar: {
			styleOverrides: {
				root: {
					'& .MuiAlert-root': {
						fontWeight: '500',
						borderRadius: 8,
						minWidth: 300,
						fontSize: 14,
						borderLeftWidth: 5,
						'&.MuiAlert-standardSuccess': {
							backgroundColor: alert.successLight,
							borderLeftColor: alert.success,
						},
						'&.MuiAlert-standardError': {
							backgroundColor: alert.errorLight,
							borderLeftColor: alert.error,
						},
						'&.MuiAlert-standardWarning': {
							backgroundColor: alert.warningLight,
							borderLeftColor: alert.warning,
						},
						'&.MuiAlert-standardInfo': {
							backgroundColor: alert.default,
							borderLeft: 'none',
							color: text.secondary,
						},
					},
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
					borderBottom: 1,
				},
			},
		},
		MuiTableBody: {
			styleOverrides: {
				root: {
					'& .MuiTableRow-root:hover': {
						backgroundColor: `${hover.alt} !important`,
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
					padding: '0.45rem 1.25rem',
					boxShadow: '0px 1px 2px 0px #1018280D',
					borderRadius: 4,
					fontWeight: 400,
				},
			},
		},
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					backgroundColor: background.fill,
					'& .Mui-selected': {
						fontWeight: 'bold',
					},
				},
			},
		},

		MuiDrawer: {
			styleOverrides: {
				paper: {
					boxSizing: 'border-box',
					border: 'none',
					borderRadius: 0,
					boxShadow: 'none',
					margin: 0,
				},
			},
		},
	},
});

export default globalTheme;
