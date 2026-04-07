import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const forbiddenTopLevelDirs = ['pages', 'api'];
const violations = forbiddenTopLevelDirs
	.map((dirName) => path.join(srcDir, dirName))
	.filter((targetPath) => fs.existsSync(targetPath));

if (violations.length > 0) {
	console.error('Reserved Next.js directories detected in src:');
	for (const violation of violations) {
		console.error(`- ${path.relative(rootDir, violation)}`);
	}
	console.error('');
	console.error('Use FSD-safe directories instead:');
	console.error('- use src/pageSlices for FSD page layer modules');
	console.error('- use src/app/api for Next route handlers');
	process.exit(1);
}

console.log('Reserved directory check passed.');
