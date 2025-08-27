// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    headers: {
      'Content-Type': 'text/javascript'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})