import madge from 'madge';
import { fileURLToPath } from 'node:url';

const srcPath = fileURLToPath(new URL('../src', import.meta.url));
const tsConfigPath = fileURLToPath(
	new URL('../tsconfig.json', import.meta.url)
);

const result = await madge(srcPath, {
	fileExtensions: ['ts', 'tsx'],
	tsConfig: tsConfigPath,
	includeNpm: false,
});

const circular = result.circular();

if (circular.length > 0) {
	console.error('[arch] Circular dependencies detected:');
	for (const cycle of circular) {
		console.error(`- ${cycle.join(' -> ')}`);
	}
	process.exit(1);
}

console.log('[arch] Import graph check passed (no circular deps).');
