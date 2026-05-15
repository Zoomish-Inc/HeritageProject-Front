import fs from 'node:fs';
import path from 'node:path';

const downloads = 'c:\\Users\\Administrator\\Downloads';
const files = fs
	.readdirSync(downloads)
	.filter((f) => f.startsWith('Шаблон') && f.endsWith('.csv'));

const slugByFile = {
	'Храм Сергия': 'khram-sergiya-radonezhskogo',
	'Женская гимназия': 'zhenskaya-gimnaziya',
	Часовня: 'chasovnya-aleksandra-nevskogo',
	'военного собрания': 'zdanie-voennogo-sobraniya-dom-oficerov',
	'военного губернатора': 'gubernatorskiy-dom',
	'Мужская гимназия': 'muzhskaya-gimnaziya',
};

const nameBySlug = {
	'khram-sergiya-radonezhskogo': 'Храм преподобного Сергия Радонежского',
	'zhenskaya-gimnaziya': 'Здание женской гимназии',
	'chasovnya-aleksandra-nevskogo': 'Часовня во имя Св. Александра Невского',
	'zdanie-voennogo-sobraniya-dom-oficerov':
		'Здание военного собрания (Дом офицеров)',
	'gubernatorskiy-dom': 'Здание военного губернатора',
	'muzhskaya-gimnaziya': 'Здание мужской гимназии',
};

const priority = [
	'khram-sergiya-radonezhskogo',
	'zhenskaya-gimnaziya',
	'chasovnya-aleksandra-nevskogo',
	'zdanie-voennogo-sobraniya-dom-oficerov',
	'gubernatorskiy-dom',
	'muzhskaya-gimnaziya',
];

function parseCsv(text) {
	const rows = [];
	let row = [];
	let cell = '';
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (inQuotes) {
			if (ch === '"' && text[i + 1] === '"') {
				cell += '"';
				i++;
			} else if (ch === '"') inQuotes = false;
			else cell += ch;
		} else if (ch === '"') inQuotes = true;
		else if (ch === ',') {
			row.push(cell);
			cell = '';
		} else if (ch === '\n' || ch === '\r') {
			if (ch === '\r' && text[i + 1] === '\n') i++;
			row.push(cell);
			if (row.some((c) => c.trim())) rows.push(row);
			row = [];
			cell = '';
		} else cell += ch;
	}
	if (cell || row.length) {
		row.push(cell);
		if (row.some((c) => c.trim())) rows.push(row);
	}
	return rows;
}

function isDirectImageUrl(url) {
	const u = url.trim().toLowerCase();
	if (!/^https?:\/\//.test(u)) return false;
	const pathPart = u.split('?')[0];
	if (/\.(jpe?g|png|webp|gif|avif)$/.test(pathPart)) return true;
	if (u.includes('upload.wikimedia.org')) return true;
	return false;
}

function classifyUrls(text) {
	const urls = [...text.matchAll(/https?:\/\/[^\s,;)"'\]]+/gi)].map((m) =>
		m[0].replace(/[.,;)\]]+$/, '')
	);
	if (!urls.length) return null;
	const nonDirect = urls.filter((u) => !isDirectImageUrl(u));
	if (!nonDirect.length) return null;
	return nonDirect;
}

function slugFromFilename(name) {
	for (const [key, slug] of Object.entries(slugByFile)) {
		if (name.includes(key)) return slug;
	}
	return name;
}

const results = [];

for (const file of files) {
	const full = path.join(downloads, file);
	const text = fs.readFileSync(full, 'utf8');
	const rows = parseCsv(text);
	const slug = slugFromFilename(file);

	for (const row of rows) {
		const block = (row[0] || '').replace(/\s+/g, ' ').trim();
		const fieldHint = (row[1] || '').trim();
		const value = (row[2] || '').trim();
		if (!block || !value) continue;
		const nonDirect = classifyUrls(value);
		if (!nonDirect) continue;
		results.push({
			slug,
			okn: nameBySlug[slug],
			block,
			csvField: fieldHint,
			urls: nonDirect,
			valuePreview: value.slice(0, 200),
		});
	}
}

results.sort((a, b) => priority.indexOf(a.slug) - priority.indexOf(b.slug));

fs.writeFileSync(
	'csv-image-scan.json',
	JSON.stringify(results, null, 2),
	'utf8'
);
console.log('rows', results.length);
