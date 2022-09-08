import React from 'react';
import { AppProps } from 'next/app';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import Head from 'next/head';
import { FluxProvider } from '../flux/context';

const AppLayout = ({ Component, pageProps }: AppProps) => (
  <main>
    <Head>
      <title>コンパチサーチ</title>
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FluxProvider>
        <Component {...pageProps} />
      </FluxProvider>
    </ThemeProvider>
  </main>
);

export default AppLayout;
