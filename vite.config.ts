import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // モダンブラウザのみ対象。modulepreload polyfill 等を省いて初期JS削減
    target: 'es2022',
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') ||
              (id.includes('node_modules/react/') && !id.includes('react-dom') && !id.includes('react-router'))) {
            return 'vendor';
          }
        },
      },
    },
  },
})
