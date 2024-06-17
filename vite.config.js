import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
	build: {
		sourcemap: true,

		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]',
				sourcemap: true,
			},
		},
	},

	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@app': path.resolve(__dirname, './src/app'),
			'@stores': path.resolve(__dirname, './src/stores'),
		},
	},

	publicDir: './src/static',

	plugins: [
		vue(),
	],
})
