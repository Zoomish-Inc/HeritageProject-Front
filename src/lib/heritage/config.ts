import { clientEnv } from '@/env';

export function isHeritageMockEnabled(): boolean {
	return clientEnv.NEXT_PUBLIC_USE_MOCK === 'true';
}
