import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { downloadGoogleDriveFile } from './lib/downloadGoogleDrive.mjs';
import { installTourPackFromZip } from './lib/installTourPack.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

function loadManifest() {
	const manifestPath =
		process.env.TOUR_PACKS_MANIFEST?.trim() ||
		path.join(repoRoot, 'tour-packs.manifest.json');

	if (!fs.existsSync(manifestPath)) {
		console.log('[tour-packs:fetch] No manifest found, skipping.');
		return [];
	}

	const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
	const packs = Array.isArray(raw.packs) ? raw.packs : [];
	return packs.filter((p) => p?.slug && (p.url || p.googleDriveFileId || p.googleDriveUrl));
}

function resolveDownloadSource(pack) {
	if (pack.url?.trim()) return pack.url.trim();
	if (pack.googleDriveUrl?.trim()) return pack.googleDriveUrl.trim();
	if (pack.googleDriveFileId?.trim()) return pack.googleDriveFileId.trim();
	return null;
}

function isPackInstalled(slug) {
	return fs.existsSync(
		path.join(repoRoot, 'public', 'tour-packs', slug, 'index.htm')
	);
}

async function main() {
	const packs = loadManifest();
	if (packs.length === 0) return;

	const downloadDir = path.join(repoRoot, '.tmp-tour-downloads');
	fs.mkdirSync(downloadDir, { recursive: true });

	for (const pack of packs) {
		const slug = pack.slug;
		const source = resolveDownloadSource(pack);

		if (!source) continue;

		if (isPackInstalled(slug) && process.env.FORCE_TOUR_PACKS !== '1') {
			console.log(`[tour-packs:fetch] ${slug}: already installed, skipping`);
			continue;
		}

		const zipPath = path.join(downloadDir, `${slug}.zip`);
		console.log(`[tour-packs:fetch] ${slug}: downloading…`);
		await downloadGoogleDriveFile(source, zipPath);
		console.log(`[tour-packs:fetch] ${slug}: installing…`);
		const dest = installTourPackFromZip(repoRoot, slug, zipPath);
		fs.rmSync(zipPath, { force: true });
		console.log(`[tour-packs:fetch] ${slug}: ready at ${path.relative(repoRoot, dest)}`);
	}
}

main().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
