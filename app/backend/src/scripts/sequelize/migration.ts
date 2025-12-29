import fs from 'fs';
import { styleText } from 'node:util';
import path from 'path';

(async () => {
  try {
    const migrationsDir = path.resolve(process.cwd(), './src/databases/postgres/migrations');
    const files = fs.readdirSync(migrationsDir);
    const latestFile = files
      .filter((file) => file.endsWith('.js'))
      .map((file) => ({ name: file, time: fs.statSync(path.join(migrationsDir, file)).ctime }))
      .sort((a, b) => b.time.getTime() - a.time.getTime())[0];

    if (!latestFile) throw new Error('No migration file found');
    const oldPath = path.join(migrationsDir, latestFile.name);
    const newPath = oldPath.replace(/\.js$/, '.ts');
    const template = fs.readFileSync(path.resolve(process.cwd(), './src/templates/sequelize/migration.ts'), 'utf8');
    fs.writeFileSync(newPath, template);
    fs.unlinkSync(oldPath);
    console.info(styleText('green', `\n✅  Migration successfully converted to TypeScript: ${path.basename(newPath)}`));
    process.exit(0);
  } catch (err) {
    console.error(styleText('red', '\n❌  Failed to converted migration:'), err);
    process.exit(1);
  }
})();
