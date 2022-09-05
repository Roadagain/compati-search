import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../src/styles/theme';
import React from 'react';
import { TestFluxProvider } from '../src/test-utils/flux';

export const decorators = [
  (Story) => (
    <TestFluxProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </TestFluxProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
