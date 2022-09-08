import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            padding: 16,
          },
        },
      },
    },
  },
});
