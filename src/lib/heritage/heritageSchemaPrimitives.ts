import { z } from 'zod';
import type { LocalizedString } from '@/entities/heritage';

export const localizedStringSchema = z.object({
	ru: z.string(),
	uz: z.string(),
});

export const photoItemSchema = z.object({
	url: z.string(),
	caption: localizedStringSchema.optional(),
	isHistorical: z.boolean().optional(),
	year: z.number().optional(),
	sourceUrl: z.string().optional(),
	credit: localizedStringSchema.optional(),
});

export const biographyMilestoneSchema = z.object({
	year: z.number(),
	event: localizedStringSchema,
});

const emptyLocalized = (): LocalizedString => ({ ru: '', uz: '' });

function localizedNonEmpty(s: LocalizedString): boolean {
	return s.ru.trim().length > 0 || s.uz.trim().length > 0;
}

export function coalesceKey(
	row: Record<string, unknown>,
	camel: string,
	snake: string
): unknown {
	if (row[camel] !== undefined && row[camel] !== null) return row[camel];
	return row[snake];
}

export function parseLocalizedFlexible(v: unknown): LocalizedString {
	const p = localizedStringSchema.safeParse(v);
	return p.success ? p.data : emptyLocalized();
}

export function parseLocalizedOptional(v: unknown): LocalizedString | undefined {
	if (v === undefined || v === null) return undefined;
	const p = localizedStringSchema.safeParse(v);
	if (!p.success || !localizedNonEmpty(p.data)) return undefined;
	return p.data;
}

export function parseNumberFlexible(v: unknown): number {
	if (typeof v === 'number' && !Number.isNaN(v)) return v;
	if (typeof v === 'string' && v.trim() !== '') {
		const n = Number(v);
		if (!Number.isNaN(n)) return n;
	}
	return 0;
}

export function parseStringFlexible(v: unknown): string {
	return typeof v === 'string' ? v : '';
}

export function parseBooleanFlexible(v: unknown): boolean | undefined {
	if (v === true || v === 1) return true;
	if (v === false || v === 0) return false;
	if (typeof v === 'string') {
		const s = v.trim().toLowerCase();
		if (s === 'true' || s === '1' || s === 'yes') return true;
		if (s === 'false' || s === '0' || s === 'no') return false;
	}
	return undefined;
}

export function parseIsoDateOptional(v: unknown): string | undefined {
	if (v === undefined || v === null) return undefined;
	if (typeof v !== 'string' || v.trim() === '') return undefined;
	const d = new Date(v);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.toISOString();
}
