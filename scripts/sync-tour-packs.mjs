import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const defaultWebPath = path.join(repoRoot, 'tour-web-export', 'Web');
const slug = process.argv[2]?.trim();
const webSource =
	process.argv[3]?.trim() ?? process.env.TOUR_WEB_EXPORT ?? defaultWebPath;

if (!slug) {
	console.error(
		'Usage: node scripts/sync-tour-packs.mjs <slug> [path-to-Web-folder]\n' +
			'Example: npm run tour-packs:sync -- zhenskaya-gimnaziya "C:\\path\\to\\Web"'
	);
	process.exit(1);
}

if (!fs.existsSync(webSource) || !fs.statSync(webSource).isDirectory()) {
	console.error(
		`[tour-packs:sync] Source folder not found: ${webSource}\n` +
			`Place the exported "Web" folder at tour-web-export/Web or pass its path:\n` +
			`  npm run tour-packs:sync -- ${slug} "C:\\path\\to\\Web"`
	);
	process.exit(1);
}

const dest = path.join(repoRoot, 'public', 'tour-packs', slug);
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(webSource, dest, { recursive: true });

console.log(`[tour-packs:sync] Copied ${webSource} → public/tour-packs/${slug}`);
