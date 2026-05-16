import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

function extractGoogleDriveFileId(urlOrId) {
	const trimmed = urlOrId.trim();
	if (!trimmed.includes('/')) return trimmed;
	const idParam = trimmed.match(/[?&]id=([^&]+)/);
	if (idParam) return idParam[1];
	const pathMatch = trimmed.match(/\/d\/([^/]+)/);
	if (pathMatch) return pathMatch[1];
	return trimmed;
}

function extractConfirmToken(html) {
	const confirmParam = html.match(/confirm=([0-9A-Za-z_-]+)/);
	if (confirmParam) return confirmParam[1];
	const inputMatch = html.match(/name="confirm"\s+value="([^"]+)"/);
	if (inputMatch) return inputMatch[1];
	return null;
}

async function downloadToFile(response, destPath) {
	if (!response.ok) {
		throw new Error(`Download failed: HTTP ${response.status}`);
	}
	const contentType = response.headers.get('content-type') ?? '';
	if (contentType.includes('text/html')) {
		const html = await response.text();
		throw new Error(
			'Google Drive returned HTML instead of a file. Check sharing: link must be "Anyone with the link".'
		);
	}
	await pipeline(Readable.fromWeb(response.body), fs.createWriteStream(destPath));
}

export async function downloadGoogleDriveFile(urlOrId, destPath) {
	const fileId = extractGoogleDriveFileId(urlOrId);
	fs.mkdirSync(path.dirname(destPath), { recursive: true });

	const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
	let response = await fetch(initialUrl, { redirect: 'follow' });

	const contentType = response.headers.get('content-type') ?? '';
	if (contentType.includes('text/html')) {
		const html = await response.text();
		const confirm = extractConfirmToken(html);
		if (!confirm) {
			throw new Error(
				'Could not get Google Drive confirm token for large file. Use "Anyone with the link" sharing.'
			);
		}
		const confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${confirm}`;
		response = await fetch(confirmUrl, { redirect: 'follow' });
	}

	await downloadToFile(response, destPath);

	const stat = fs.statSync(destPath);
	if (stat.size < 1024 * 1024) {
		const head = fs.readFileSync(destPath, 'utf8').slice(0, 200);
		if (head.includes('<!DOCTYPE') || head.includes('<html')) {
			fs.rmSync(destPath, { force: true });
			throw new Error(
				'Downloaded file looks like an HTML page, not a zip. Check Google Drive sharing settings.'
			);
		}
	}

	return destPath;
}
