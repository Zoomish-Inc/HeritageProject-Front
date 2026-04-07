import { expect, test } from '@playwright/test';

test('home pages render in ru and uz', async ({ page }) => {
	await page.goto('/ru');
	await expect(page).toHaveTitle(/Наследие Ферганы/i);
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

	await page.goto('/uz');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('detail page exists via first card link', async ({ page }) => {
	await page.goto('/ru');
	const firstObjectLink = page.locator('a[href*="/heritage/"]').first();
	await expect(firstObjectLink).toBeVisible();
	await firstObjectLink.click();
	await expect(page).toHaveURL(/\/ru\/heritage\//);
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('robots and sitemap are available', async ({ request }) => {
	const robots = await request.get('/robots.txt');
	expect(robots.ok()).toBe(true);
	const robotsBody = await robots.text();
	expect(robotsBody).toContain('Sitemap:');

	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.ok()).toBe(true);
	const sitemapBody = await sitemap.text();
	expect(sitemapBody).toContain('<urlset');
});
