import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { FluxProvider } from '../flux/context';
import { theme } from '../styles/theme';

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
