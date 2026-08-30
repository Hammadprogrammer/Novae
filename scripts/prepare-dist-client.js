import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, '.output', 'public');
const targetDir = path.join(rootDir, 'dist', 'client');

if (!fs.existsSync(sourceDir)) {
  console.error(`Build output was not generated at ${sourceDir}.`);
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Prepared deployment output at ${targetDir}`);
