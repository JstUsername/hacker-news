import * as esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  packages: 'external',
  outdir: './dist',
  allowOverwrite: true,
});
