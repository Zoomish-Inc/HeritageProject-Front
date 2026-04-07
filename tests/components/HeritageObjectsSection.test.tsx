/* eslint-disable @next/next/no-img-element -- мок next/image в тестах */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HeritageObjectsSection } from '@/widgets/heritage';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import { MOCK_HERITAGE_LIST } from '@/mocks/heritage';
import type { HeritageListItem } from '@/entities/heritage';

function heritageListQueryStub(
	partial: Record<string, unknown>
): ReturnType<typeof useHeritageListQuery> {
	return partial as unknown as ReturnType<typeof useHeritageListQuery>;
}

vi.mock('next/image', () => ({
	default: ({
		src,
		alt,
		className,
	}: {
		src: string;
		alt: string;
		className?: string;
	}) => <img src={src} alt={alt} className={className} />,
}));

vi.mock('@/i18n/navigation', () => ({
	Link: ({
		children,
		href,
		className,
	}: {
		children: React.ReactNode;
		href: string;
		className?: string;
	}) => (
		<a href={href} className={className}>
			{children}
		</a>
	),
}));

vi.mock('@/hooks/useHeritageListQuery', () => ({
	useHeritageListQuery: vi.fn(),
}));

const messages = {
	home: { readMore: 'Подробнее' },
	heritage: { error: 'Ошибка загрузки', loading: 'Загрузка…' },
};

function renderSection() {
	return render(
		<NextIntlClientProvider locale="ru" messages={messages}>
			<HeritageObjectsSection />
		</NextIntlClientProvider>
	);
}

describe('HeritageObjectsSection', () => {
	beforeEach(() => {
		vi.mocked(useHeritageListQuery).mockReset();
	});

	it('renders cards when list is loaded', () => {
		vi.mocked(useHeritageListQuery).mockReturnValue(
			heritageListQueryStub({
				data: MOCK_HERITAGE_LIST,
				isError: false,
				isPending: false,
			})
		);

		renderSection();

		expect(
			screen.getByText(MOCK_HERITAGE_LIST[0].name.ru, { exact: false })
		).toBeDefined();
		expect(screen.getAllByText('Подробнее').length).toBeGreaterThanOrEqual(1);
	});

	it('shows error copy when query failed', () => {
		vi.mocked(useHeritageListQuery).mockReturnValue(
			heritageListQueryStub({
				data: undefined,
				isError: true,
				isPending: false,
			})
		);

		renderSection();
		expect(screen.getByText('Ошибка загрузки')).toBeDefined();
	});

	it('shows loading when pending without data', () => {
		vi.mocked(useHeritageListQuery).mockReturnValue(
			heritageListQueryStub({
				data: undefined,
				isError: false,
				isPending: true,
			})
		);

		renderSection();
		expect(screen.getByText('Загрузка…')).toBeDefined();
	});

	it('renders nothing when list is empty', () => {
		vi.mocked(useHeritageListQuery).mockReturnValue(
			heritageListQueryStub({
				data: [] as HeritageListItem[],
				isError: false,
				isPending: false,
			})
		);

		const { container } = renderSection();
		expect(container.querySelector('.grid')).toBeNull();
	});
});
