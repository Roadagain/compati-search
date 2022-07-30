import React from 'react';
import { AppProps } from 'next/app';
import '@fontsource/noto-sans-jp/100.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import '@fontsource/noto-sans-jp/900.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';

const AppLayout = ({ Component, pageProps }: AppProps) => (
  <main>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </main>
);

export default AppLayout;
