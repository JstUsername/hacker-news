import '@fontsource/source-code-pro';
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  fonts: {
    main: 'Source Code Pro, monospace',
  },
  color: {
    background: 'rgba(2, 39, 65, 0.75)',
    backgroundLightTransparent: 'rgba(2, 39, 65, 0.5)',
    backgroundDark: '#011C27',
    purple: '#B14ABF',
    yellow: '#F2E63C',
    green: '#41BF9A',
  },
  typography: {
    h1: {
      fontFamily: 'Source Code Pro, monospace',
      fontSize: '32px',
      lineHeight: '1',
    },
    body1: {
      fontFamily: 'Source Code Pro, monospace',
      fontSize: '16px',
      lineHeight: '1',
    },
    body2: {
      fontFamily: 'Source Code Pro, monospace',
      fontSize: '20px',
      lineHeight: '1',
    },
  },
  breakpoints: {
    xs: '0',
    sm: '768px',
    md: '1024px',
    lg: '1440px',
    xl: '1920px',
  },
};

export { theme };
