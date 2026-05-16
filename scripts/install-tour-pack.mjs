import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { installTourPackFromZip } from './lib/installTourPack.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const slug = process.argv[2];
const zipPath = process.argv[3];

if (!slug || !zipPath) {
	console.error(
		'Usage: node scripts/install-tour-pack.mjs <slug> <path-to-zip>\n' +
			'Example: node scripts/install-tour-pack.mjs zhenskaya-gimnaziya "C:\\Downloads\\tour.zip"'
	);
	process.exit(1);
}

try {
	const dest = installTourPackFromZip(repoRoot, slug, zipPath);
	console.log(`[install-tour-pack] Installed → ${path.relative(repoRoot, dest)}/`);
	console.log(`  Open: http://localhost:3000/tour-packs/${slug}/index.htm`);
} catch (err) {
	console.error(err.message || err);
	process.exit(1);
}
