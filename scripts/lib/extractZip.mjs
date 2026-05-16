import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export function extractZip(zipPath, destinationDir) {
	fs.mkdirSync(destinationDir, { recursive: true });

	if (process.platform === 'win32') {
		const zipArg = zipPath.replace(/'/g, "''");
		const destArg = destinationDir.replace(/'/g, "''");
		execSync(
			`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipArg}' -DestinationPath '${destArg}' -Force"`,
			{ stdio: 'inherit' }
		);
		return;
	}

	execSync(`unzip -oq ${JSON.stringify(zipPath)} -d ${JSON.stringify(destinationDir)}`, {
		stdio: 'inherit',
	});
}
