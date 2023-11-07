import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/* // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ga': 'http://localhost/ga',
    },
  },
}); */
/* // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ga': 'http://localhost:3006',
    },
  },
}); */

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ga': {
        target: 'http://localhost',
        rewrite: (path) => path.replace(/^\/ga/, '/ga'), // Optional, if needed
        changeOrigin: true, // Optional, if your backend server requires it
      },
    },
  },
});