import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const slug = process.argv[2];
const zipPath = process.argv[3];

if (!slug || !zipPath) {
	console.error(
		'Usage: node scripts/install-tour-pack.mjs <slug> <path-to-zip>\n' +
			'Example: node scripts/install-tour-pack.mjs khram-sergiya-radonezhskogo "C:\\Downloads\\khram-tour.zip"'
	);
	process.exit(1);
}

const resolvedZip = path.resolve(zipPath);
if (!fs.existsSync(resolvedZip)) {
	console.error(`Zip not found: ${resolvedZip}`);
	process.exit(1);
}

const tempDir = path.join(repoRoot, '.tmp-tour-extract', slug);
const dest = path.join(repoRoot, 'public', 'tour-packs', slug);

fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

const zipArg = resolvedZip.replace(/'/g, "''");
const tempArg = tempDir.replace(/'/g, "''");
execSync(
	`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipArg}' -DestinationPath '${tempArg}' -Force"`,
	{ stdio: 'inherit' }
);

function findWebRoot(dir) {
	if (fs.existsSync(path.join(dir, 'index.htm'))) return dir;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const found = findWebRoot(path.join(dir, entry.name));
		if (found) return found;
	}
	return null;
}

const webRoot = findWebRoot(tempDir);
if (!webRoot) {
	console.error('[install-tour-pack] index.htm not found inside zip');
	process.exit(1);
}

const tdvPlayerPath = path.join(webRoot, 'lib', 'tdvplayer.js');
if (!fs.existsSync(tdvPlayerPath)) {
	console.error(
		'[install-tour-pack] Incomplete 3DVista export: lib/tdvplayer.js is missing.\n' +
			'Re-export the tour in 3DVista as a full Web package (folder must contain lib/, locale/, skin/ with files).'
	);
	process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(webRoot, dest, { recursive: true });
fs.rmSync(path.join(repoRoot, '.tmp-tour-extract'), { recursive: true, force: true });

const fileCount = fs.readdirSync(dest, { recursive: true }).length;
console.log(`[install-tour-pack] Installed ${fileCount} entries → public/tour-packs/${slug}/`);
console.log(`  Open: http://localhost:3000/tour-packs/${slug}/index.htm`);
