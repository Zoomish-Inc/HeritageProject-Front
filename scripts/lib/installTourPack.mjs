import fs from 'node:fs';
import path from 'node:path';
import { extractZip } from './extractZip.mjs';

export function findWebRoot(dir) {
	if (fs.existsSync(path.join(dir, 'index.htm'))) return dir;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const found = findWebRoot(path.join(dir, entry.name));
		if (found) return found;
	}
	return null;
}

export function installTourPackFromZip(repoRoot, slug, zipPath) {
	const resolvedZip = path.resolve(zipPath);
	if (!fs.existsSync(resolvedZip)) {
		throw new Error(`Zip not found: ${resolvedZip}`);
	}

	const tempDir = path.join(repoRoot, '.tmp-tour-extract', slug);
	const dest = path.join(repoRoot, 'public', 'tour-packs', slug);

	fs.rmSync(tempDir, { recursive: true, force: true });
	fs.mkdirSync(tempDir, { recursive: true });
	extractZip(resolvedZip, tempDir);

	const webRoot = findWebRoot(tempDir);
	if (!webRoot) {
		throw new Error('[install-tour-pack] index.htm not found inside zip');
	}

	const tdvPlayerPath = path.join(webRoot, 'lib', 'tdvplayer.js');
	if (!fs.existsSync(tdvPlayerPath)) {
		throw new Error(
			'[install-tour-pack] Incomplete 3DVista export: lib/tdvplayer.js is missing.\n' +
				'Re-export the tour in 3DVista as a full Web package (folder must contain lib/, locale/, skin/ with files).'
		);
	}

	fs.rmSync(dest, { recursive: true, force: true });
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.cpSync(webRoot, dest, { recursive: true });
	fs.rmSync(path.join(repoRoot, '.tmp-tour-extract'), {
		recursive: true,
		force: true,
	});

	return dest;
}
