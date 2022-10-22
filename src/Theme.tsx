import { createTheme } from '@mui/material';
import { green, deepPurple } from '@mui/material/colors';

export const myPalette = {
  green: {
    bright: green['A700'],
    dark: green['900'],
    mute: green['A400']
  },
  deepPurple: {
    bright: deepPurple['A700'],
    dark: deepPurple['900'],
    mute: deepPurple['A400']
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: '#19857b'
    },
    background: {
      default: '#fff'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  }
});
