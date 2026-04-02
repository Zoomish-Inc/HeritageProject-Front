import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				parchment: {
					50: '#fdf8f0',
					100: '#f5ede0',
					200: '#ead8c0',
					300: '#d9bfa0',
				},
				sepia: {
					900: '#1a0f08',
					800: '#2d1a0e',
					700: '#3d2b1f',
					600: '#5a3d2b',
					500: '#7a5238',
					400: '#a0714f',
				},
				gold: {
					300: '#e8cc7a',
					400: '#c9a84c',
					500: '#a87c2a',
					600: '#8b5e1a',
				},
			},
			fontFamily: {
				display: ['var(--font-display)', 'Georgia', 'serif'],
				body: ['var(--font-body)', 'Georgia', 'serif'],
				ui: ['var(--font-ui)', 'Georgia', 'serif'],
			},
			backgroundImage: {
				'parchment-texture': "url('/textures/parchment.svg')",
			},
		},
	},
	plugins: [],
};

export default config;
