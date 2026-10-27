import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative, so the build works on Netlify,
// GitHub Pages, or when opening dist/index.html from a subfolder.
export default defineConfig({
  plugins: [react()],
  base: './',
});
