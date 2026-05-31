import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const manifest = require('./src/manifest.json');

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    crx({ manifest }),
  ],
});
