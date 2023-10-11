import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), svgr(), eslint()],
  resolve: {
    alias: {
      components: '/src/components',
      constants: '/src/constants',
      contexts: '/src/contexts',
      pages: '/src/pages',
      types: '/src/types',
      utils: '/src/utils',
    },
  },
});
