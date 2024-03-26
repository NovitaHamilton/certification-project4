import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-yvd3.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // This will remove the '/api' prefix
      },
    },
  },
});
