import { createTheme } from '@mui/material/styles';

import { notoSansJp } from './font';

export const theme = createTheme({
  typography: {
    fontFamily: [
      notoSansJp.style.fontFamily,
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
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
