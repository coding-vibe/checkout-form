import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
