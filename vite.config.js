import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import inject from '@rollup/plugin-inject';

const webixInject = { webix: ['@xbs/webix-pro', '*'] };

// https://vite.dev/config/
export default defineConfig(({ command }) => {
	const isBuild = command === 'build';
	return {
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		plugins: [
			vue(),
			vueDevTools(),
			!isBuild && {
				// use rollup inject plugin for the src files in dev mode
				...inject({
					...webixInject,
					include: ['src/**/*.js', 'src/**/*.vue']
				})
			}
		].filter(Boolean),
		// use rollup inject plugin for the node_modules packages in dev mode
		optimizeDeps: {
			rollupOptions: {
				plugins: [
					inject({
						...webixInject,
						include: ['node_modules/@xbs/gantt/**/*.js', 'node_modules/@xbs/spreadsheet/**/*.js']
					})
				]
			}
		},
		build: {
			// use rolldown built-in inject feature for build mode
			rolldownOptions: { transform: { inject: { ...webixInject } } },
			// The main application chunk intentionally exceeds Vite's default
			// warning threshold (500 kB). Increase the limit to avoid
			// chunk size warnings.
			chunkSizeWarningLimit: 1050
		}
	};
});
