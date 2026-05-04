import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

const HERITAGE_TOUR_SLUGS = [
	'zdanie-voennogo-sobraniya-dom-oficerov',
	'gubernatorskiy-dom',
	'zhenskaya-gimnaziya',
	'chasovnya-aleksandra-nevskogo',
	'khram-sergiya-radonezhskogo',
	'muzhskaya-gimnaziya',
];

const defaultWebPath = path.join(repoRoot, 'tour-web-export', 'Web');
const webSource = process.argv[2] ?? process.env.TOUR_WEB_EXPORT ?? defaultWebPath;

if (!fs.existsSync(webSource) || !fs.statSync(webSource).isDirectory()) {
	console.error(
		`[tour-packs:sync] Source folder not found: ${webSource}\n` +
			`Place the exported "Web" folder at tour-web-export/Web or pass its path:\n` +
			`  npm run tour-packs:sync -- "C:\\path\\to\\Web"`
	);
	process.exit(1);
}

for (const slug of HERITAGE_TOUR_SLUGS) {
	const dest = path.join(repoRoot, 'public', 'tour-packs', slug);
	fs.rmSync(dest, { recursive: true, force: true });
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.cpSync(webSource, dest, { recursive: true });
}

console.log(
	`[tour-packs:sync] Copied ${webSource} → public/tour-packs/{${HERITAGE_TOUR_SLUGS.length} slugs}`
);
