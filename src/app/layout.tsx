'use client';

import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

import { FluxProvider } from '../flux/context';
import { theme } from '../styles/theme';

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <html lang="ja">
    <head>
      <link rel="icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>互艦サーチ</title>
      <meta
        name="description"
        content="タグを使って互換性のある艦を探しましょう"
      />
    </head>
    <body>
      <main>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FluxProvider>{children}</FluxProvider>
        </ThemeProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
