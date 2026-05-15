import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mockPath = path.join(
	__dirname,
	'..',
	'src',
	'mocks',
	'heritage',
	'rawMockHeritageObjects.ts'
);

const source = fs.readFileSync(mockPath, 'utf8');

const slugBlocks = source
	.split(/slug:\s*"/)
	.slice(1)
	.map((chunk) => {
		const slug = chunk.slice(0, chunk.indexOf('"'));
		return { slug, chunk };
	});

const patterns = [
	{
		id: 'A',
		label: 'page ref in text',
		re: /\(стр\.?\s*\d+\)|\(\d+-bet\)/gi,
	},
	{
		id: 'B',
		label: 'raw URL in bio/history',
		re: /https?:\/\/[^\s"']+/g,
		scopes: ['historicalFigures', 'architectBio', 'bio:'],
	},
	{
		id: 'D',
		label: 'template label',
		re: /^(Должность|Миссия|Технология|Символика|Происхождение|Биографические вехи|Ниже представлены):/m,
	},
];

let issueCount = 0;

for (const { slug, chunk } of slugBlocks) {
	const lines = [];
	const figures = chunk.match(
		/historicalFigures:\s*\[([\s\S]*?)\],\s*\n\s*photos:/
	);
	if (figures?.[1].includes('name:')) {
		const pageRefs = figures[1].match(/\(стр\.?\s*\d+\)|\(\d+-bet\)/gi);
		if (pageRefs?.length) {
			lines.push(`  [A] historicalFigures page refs: ${pageRefs.join(', ')}`);
		}
		const figuresWithoutSourceUrls = figures[1]
			.replace(/bioSourceUrl:\s*"[^"]*"/g, '')
			.replace(/bio_source_url:\s*"[^"]*"/g, '');
		const urls = figuresWithoutSourceUrls.match(/https?:\/\/[^\s"']+/g);
		if (urls?.length) {
			lines.push(`  [B] historicalFigures URLs in bio: ${urls.length}`);
		}
		const bioStubs = [
			...figures[1].matchAll(/bio:\s*\{\s*ru:\s*"([^"]{0,120})"/g),
		];
		for (const m of bioStubs) {
			if (m[1].length < 80 && !m[1].includes('\n')) {
				lines.push(`  [C] short bio: "${m[1].slice(0, 60)}..."`);
			}
		}
	}

	const architectBio = chunk.match(/architectBio:\s*\{([\s\S]*?)\n\s*\},/);
	if (architectBio) {
		const ab = architectBio[1];
		if (patterns[0].re.test(ab)) {
			lines.push(`  [A] architectBio page refs`);
		}
		if (/https?:\/\//.test(ab)) {
			lines.push(`  [B] architectBio contains URL`);
		}
		if (patterns[2].re.test(ab)) {
			lines.push(`  [D] architectBio template labels`);
		}
	}

	if (lines.length) {
		console.log(`\n${slug}`);
		for (const line of lines) console.log(line);
		issueCount += lines.length;
	}
}

if (issueCount === 0) {
	console.log('No heritage content audit issues found.');
} else {
	console.log(`\nTotal issue lines: ${issueCount}`);
	process.exitCode = 1;
}
