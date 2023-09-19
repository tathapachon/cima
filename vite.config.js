import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copy } from 'vite-plugin-copy';


export default defineConfig({
  plugins: [
    react(),
    copy({
      patterns: [
        { from: 'src/assets', to: 'assets' } // Cambia 'src/assets' por la ruta de tus imágenes
      ],
    }),
  ],
});