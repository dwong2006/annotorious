import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import dts from 'vite-plugin-dts';

import * as packageJson from './package.json';

export default defineConfig({
  plugins: [
    svelte({ preprocess: sveltePreprocess() }),
    dts({ insertTypesEntry: true, include: ['./src/'], entryRoot: './src' })
  ],
  server: {
    open: '/test/index.html'
  },
  build: {
    sourcemap: true,
	minify: false,
    lib: {
      entry: './src/index.ts',
      name: 'AnnotoriousOSD',
      formats: ['es', 'umd'],
      fileName: (format) => 
        format === 'umd' ? `annotorious-openseadragon.js` : `annotorious-openseadragon.es.js` 
    },
    rollupOptions: {
      external: Object.keys(packageJson.peerDependencies),
      output: {
        assetFileNames: 'annotorious-openseadragon.[ext]',
        globals: {
          openseadragon: 'OpenSeadragon'
        }
      }
    }
  }
});
