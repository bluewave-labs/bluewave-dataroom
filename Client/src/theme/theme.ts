import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			light: '#7986cb',
			main: '#3f51b5',
			dark: '#303f9f',
			contrastText: '#fff',
		},
		background: {
			paper: '#fff',
		},
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
	},
});

export default theme;
