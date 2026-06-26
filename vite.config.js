import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		// The main application chunk intentionally exceeds Vite's default
		// warning threshold (500 kB). Increase the limit to avoid
		// chunk size warnings.
		chunkSizeWarningLimit: 1050
	}
});
