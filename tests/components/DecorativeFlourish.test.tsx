import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DecorativeFlourish } from '@/components/UI/DecorativeFlourish';

describe('DecorativeFlourish', () => {
	it('renders central marker', () => {
		render(<DecorativeFlourish />);
		expect(screen.getByText('✦')).toBeDefined();
	});

	it('applies footer variant star styling', () => {
		const { container } = render(<DecorativeFlourish variant="footer" />);
		const star = within(container).getByText('✦');
		expect(star.className).toContain('text-gold-400/50');
		expect(container.querySelector('.max-w-24')).toBeDefined();
	});
});
