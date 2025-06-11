import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
console.log(__dirname);

export default defineConfig({
    build: {
        minify: 'esbuild',
        outDir: 'dist',
    },
    plugins: [tsconfigPaths()],
     resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
            '@config': path.resolve(__dirname, './src/config'),
            '@controllers': path.resolve(__dirname, '/src/controllers'),
            '@database': path.resolve(__dirname, '/src/database'),
            '@errors': path.resolve(__dirname, '/src/errors'),
            '@models': path.resolve(__dirname, '/src/datanase/models'),
            '@models/types': path.resolve(__dirname, '/src/database/types'),
            '@routes': path.resolve(__dirname, '/src/routes'),
            '@services': path.resolve(__dirname, '/src/services'),
            '@utils': path.resolve(__dirname, '/src/utils'),
        },
    },
    server: {
        port: 3000,
        strictPort: true,
        watch: { usePolling: true },
    },
});