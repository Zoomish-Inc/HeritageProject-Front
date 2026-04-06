import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const readmePath = path.join(projectRoot, 'README.md');
const configPath = path.join(projectRoot, 'docs', 'structure.config.json');

const blockStart = '<!-- docs:structure:start -->';
const blockEnd = '<!-- docs:structure:end -->';

const defaultConfig = {
	roots: ['src', 'tests'],
	excludePaths: [],
};

const collator = new Intl.Collator('en', {
	numeric: true,
	sensitivity: 'base',
});

async function loadConfig() {
	try {
		const raw = await readFile(configPath, 'utf8');
		const parsed = JSON.parse(raw);
		return {
			roots: Array.isArray(parsed.roots) ? parsed.roots : defaultConfig.roots,
			excludePaths: Array.isArray(parsed.excludePaths)
				? parsed.excludePaths.map((p) => p.replace(/\\/g, '/'))
				: defaultConfig.excludePaths,
		};
	} catch {
		return defaultConfig;
	}
}

function isExcluded(relativePosixPath, excludePaths) {
	const normalized = relativePosixPath.replace(/\\/g, '/');
	for (const pattern of excludePaths) {
		const p = pattern.replace(/\\/g, '/');
		if (normalized === p || normalized.startsWith(`${p}/`)) {
			return true;
		}
	}
	return false;
}

async function readTreeEntries(absoluteDirPath, relativeDirPath, excludePaths) {
	const dirEntries = await readdir(absoluteDirPath, { withFileTypes: true });

	return dirEntries
		.filter((entry) => !entry.name.startsWith('.'))
		.map((entry) => ({
			name: entry.name,
			isDirectory: entry.isDirectory(),
			absolutePath: path.join(absoluteDirPath, entry.name),
			relativePath: path.posix.join(relativeDirPath, entry.name),
		}))
		.filter((entry) => !isExcluded(entry.relativePath, excludePaths))
		.sort((a, b) => {
			if (a.isDirectory !== b.isDirectory) {
				return a.isDirectory ? -1 : 1;
			}
			return collator.compare(a.name, b.name);
		});
}

async function buildTreeLines(relativeRootPath, excludePaths) {
	const absoluteRootPath = path.join(projectRoot, relativeRootPath);
	const lines = [relativeRootPath.replace(/\\/g, '/')];

	async function walk(absoluteDirPath, relativeDirPath, prefix) {
		const entries = await readTreeEntries(
			absoluteDirPath,
			relativeDirPath,
			excludePaths
		);

		for (let index = 0; index < entries.length; index += 1) {
			const entry = entries[index];
			const isLast = index === entries.length - 1;
			const branch = isLast ? '└── ' : '├── ';

			lines.push(`${prefix}${branch}${entry.name}`);

			if (entry.isDirectory) {
				const nextPrefix = `${prefix}${isLast ? '    ' : '│   '}`;
				await walk(entry.absolutePath, entry.relativePath, nextPrefix);
			}
		}
	}

	await walk(absoluteRootPath, relativeRootPath.replace(/\\/g, '/'), '');
	return lines;
}

async function buildStructureBlock(config) {
	const allLines = [];
	const roots = config.roots;
	const excludePaths = config.excludePaths;

	for (let index = 0; index < roots.length; index += 1) {
		const target = roots[index];
		const treeLines = await buildTreeLines(target, excludePaths);
		allLines.push(...treeLines);

		if (index < roots.length - 1) {
			allLines.push('');
		}
	}

	return `${blockStart}\n\`\`\`text\n${allLines.join('\n')}\n\`\`\`\n${blockEnd}`;
}

async function main() {
	const checkMode = process.argv.includes('--check');
	const config = await loadConfig();
	const currentReadme = await readFile(readmePath, 'utf8');

	if (!currentReadme.includes(blockStart) || !currentReadme.includes(blockEnd)) {
		throw new Error(`README markers not found: ${blockStart} ... ${blockEnd}`);
	}

	const blockPattern = new RegExp(`${blockStart}[\\s\\S]*?${blockEnd}`, 'm');
	const nextBlock = await buildStructureBlock(config);
	const updatedReadme = currentReadme.replace(blockPattern, nextBlock);

	if (checkMode) {
		if (updatedReadme !== currentReadme) {
			console.error(
				'README structure block is outdated. Run: npm run docs:structure'
			);
			process.exitCode = 1;
		}
		return;
	}

	if (updatedReadme !== currentReadme) {
		await writeFile(readmePath, updatedReadme, 'utf8');
	}
}

await main();
