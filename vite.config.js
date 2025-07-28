import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@reduxjs/toolkit',
            'react-redux',
            'axios',
          ],
          antd: ['antd'],
          'ace-builds': ['ace-builds'],
          recharts: ['recharts'],
          survey: [
            'survey-core',
            'survey-creator-core',
            'survey-creator-react',
            'survey-react-ui',
          ],
        },
      },
    },
  },
});
