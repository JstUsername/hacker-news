import esbuild from 'esbuild';
import fg from 'fast-glob';

(async () => {
  const DATABASE_FILES =  await fg('src/databases/**/*');

  esbuild.buildSync({
    entryPoints: ['./src/server.ts', ...DATABASE_FILES],
    bundle: true,
    platform: 'node',
    packages: 'external',
    outdir: './dist',
    allowOverwrite: true,
    entryNames: '[dir]/[name]',
    outbase: 'src',
  });
})();
