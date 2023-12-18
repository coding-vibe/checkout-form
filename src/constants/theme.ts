import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 500,
      sm: 800,
      md: 1000,
      lg: 1200,
      xl: 1400,
    },
  },
  palette: {
    primary: {
      light: '#641d49',
      main: '#57103c',
      dark: '#40122f',
    },
    secondary: {
      main: '#ffffbf',
    },
  },
});

export default theme;
