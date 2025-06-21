import path from 'path';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/default
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
        port: mode === 'development' ? 5173 : 8080,
        proxy: {
            '/api': 'http://localhost:3000',
            '/auth': 'http://localhost:3000',
        },
    },
    resolve: {
        alias: {
            '@api': path.resolve(__dirname, './src/api'),
            '@atoms': path.resolve(__dirname, './src/atoms'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: mode === 'development',
  },
}));
