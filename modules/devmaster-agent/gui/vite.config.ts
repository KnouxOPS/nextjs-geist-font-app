import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './modules/devmaster-agent/gui',
  build: {
    outDir: '../../dist/gui',
    emptyOutDir: true,
  },
  server: {
    port: 8000,
  },
});
