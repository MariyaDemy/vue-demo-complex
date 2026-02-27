import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      ...inject({
        webix: ['@xbs/webix-pro', '*'],
        enforce: 'pre',
        include: ['**/*.js', '**/*.vue']
      })
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      plugins: [
        inject({
          webix: ['@xbs/webix-pro', '*'],
        })
      ],
    }
  }
})
