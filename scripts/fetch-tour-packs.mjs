import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { downloadGoogleDriveFile } from './lib/downloadGoogleDrive.mjs';
import { installTourPackFromZip } from './lib/installTourPack.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

function filterValidPacks(packs) {
	return packs.filter(
		(p) => p?.slug && (p.url || p.googleDriveFileId || p.googleDriveUrl)
	);
}

function parseManifestPayload(raw) {
	if (Array.isArray(raw)) return filterValidPacks(raw);
	if (Array.isArray(raw?.data)) return filterValidPacks(raw.data);
	if (Array.isArray(raw?.packs)) return filterValidPacks(raw.packs);
	return [];
}

function loadManifestFromFile() {
	const manifestPath = process.env.TOUR_PACKS_MANIFEST?.trim();
	if (!manifestPath) {
		return [];
	}

	if (!fs.existsSync(manifestPath)) {
		throw new Error(`[tour-packs:fetch] TOUR_PACKS_MANIFEST not found: ${manifestPath}`);
	}

	const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
	return parseManifestPayload(raw);
}

async function loadManifestFromApi(apiUrl) {
	const response = await fetch(apiUrl);
	if (!response.ok) {
		throw new Error(
			`[tour-packs:fetch] API ${response.status} ${response.statusText}: ${apiUrl}`
		);
	}

	const raw = await response.json();
	if (raw.success === false) {
		throw new Error(`[tour-packs:fetch] API success=false: ${apiUrl}`);
	}

	return parseManifestPayload(raw);
}

async function loadManifest() {
	const apiUrl = process.env.TOUR_PACKS_API_URL?.trim();
	if (apiUrl) {
		console.log(`[tour-packs:fetch] Loading manifest from API: ${apiUrl}`);
		const packs = await loadManifestFromApi(apiUrl);
		console.log(`[tour-packs:fetch] API returned ${packs.length} pack(s)`);
		for (const pack of packs) {
			if (pack.updatedAt) {
				console.log(
					`[tour-packs:fetch] ${pack.slug}: updatedAt=${pack.updatedAt}`
				);
			}
		}
		return packs;
	}

	const packs = loadManifestFromFile();
	if (packs.length === 0) {
		console.log(
			'[tour-packs:fetch] No tour packs configured. Set TOUR_PACKS_API_URL or TOUR_PACKS_MANIFEST.'
		);
	} else {
		console.log(
			`[tour-packs:fetch] Loaded ${packs.length} pack(s) from local manifest`
		);
	}
	return packs;
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
	const apiUrl = process.env.TOUR_PACKS_API_URL?.trim();
	let packs;

	try {
		packs = await loadManifest();
	} catch (err) {
		console.error(err.message || err);
		if (apiUrl) process.exit(1);
		throw err;
	}

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
