import { createTheme } from '@mui/material';
import { green, deepPurple, purple, grey } from '@mui/material/colors';

export const myPalette = {
  green: {
    bright: green['A700'],
    dark: green[900],
    mute: green[400],
    faded: green[50]
  },
  deepPurple: {
    bright: deepPurple['A700'],
    dark: deepPurple[900],
    mute: deepPurple[400],
    faded: deepPurple[50]
  },
  purple: {
    bright: purple['A700'],
    dark: purple[900],
    mute: purple[400],
    faded: purple[50]
  },
  page: {
    lightGrey: '#e9edf1',
    mediumGrey: '#d4d8dc'
  },
  text: {
    bright: grey[400],
    dark: grey[800],
    mute: grey['A400']
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: myPalette.deepPurple.mute
    },
    secondary: {
      main: myPalette.deepPurple.dark
    },
    error: {
      main: '#19857b'
    },
    background: {
      default: myPalette.page.lightGrey
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
