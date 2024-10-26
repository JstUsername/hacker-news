import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

dotenv.config();

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: parseInt(process.env.REACT_PORT || '3000'),
  },
});
