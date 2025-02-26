import { defineConfig } from 'vite';
import angular from 'vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  build: {
    minify: 'esbuild',
    esbuild: {
      legalComments: 'none',
      preserveSymbols: true,
    },
  },
});
