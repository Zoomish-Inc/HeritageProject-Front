import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const configPath = path.join(rootDir, 'docs', 'structure.config.json');

const defaultRule = {
	forbiddenTopLevelDirs: ['pages', 'api'],
	allowedApiDirs: ['app/api'],
	preferredPageLayerDir: 'pageSlices',
};

function loadRuleFromConfig() {
	try {
		const raw = fs.readFileSync(configPath, 'utf8');
		const parsed = JSON.parse(raw);
		const rule = parsed?.reservedDirectoryRules?.src;
		if (!rule || typeof rule !== 'object') return defaultRule;
		return {
			forbiddenTopLevelDirs: Array.isArray(rule.forbiddenTopLevelDirs)
				? rule.forbiddenTopLevelDirs
				: defaultRule.forbiddenTopLevelDirs,
			allowedApiDirs: Array.isArray(rule.allowedApiDirs)
				? rule.allowedApiDirs
				: defaultRule.allowedApiDirs,
			preferredPageLayerDir:
				typeof rule.preferredPageLayerDir === 'string'
					? rule.preferredPageLayerDir
					: defaultRule.preferredPageLayerDir,
		};
	} catch {
		return defaultRule;
	}
}

const rule = loadRuleFromConfig();
const forbiddenTopLevelDirs = rule.forbiddenTopLevelDirs;
const violations = forbiddenTopLevelDirs
	.map((dirName) => path.join(srcDir, dirName))
	.filter((targetPath) => fs.existsSync(targetPath));

if (violations.length > 0) {
	console.error('Reserved Next.js directories detected in src:');
	for (const violation of violations) {
		console.error(`- ${path.relative(rootDir, violation)}`);
	}
	console.error('');
	console.error('Use FSD-safe directories instead:');
	console.error(
		`- use src/${rule.preferredPageLayerDir} for FSD page layer modules`
	);
	for (const apiDir of rule.allowedApiDirs) {
		console.error(`- use src/${apiDir} for Next route handlers`);
	}
	process.exit(1);
}

console.log('Reserved directory check passed.');
