import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset URLs + HashRouter work on GitHub Pages without server rewrites.
export default defineConfig({ plugins: [react()], base: './' });
