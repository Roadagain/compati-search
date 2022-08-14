import React from 'react';
import { AppProps } from 'next/app';
import '@fontsource/noto-sans-jp/100.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import '@fontsource/noto-sans-jp/900.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import Head from 'next/head';

const AppLayout = ({ Component, pageProps }: AppProps) => (
  <main>
    <Head>
      <title>コンパチサーチ</title>
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </main>
);

export default AppLayout;
