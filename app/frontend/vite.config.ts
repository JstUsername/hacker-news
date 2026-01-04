import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const API_URL = process.env.API_URL || 'http://localhost:3001';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@hacker-news': path.resolve(__dirname, '../../'),
      '~': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    port: parseInt(process.env.REACT_PORT || '3000'),
    proxy: { '/api/': API_URL },
    allowedHosts: true,
  },
});
