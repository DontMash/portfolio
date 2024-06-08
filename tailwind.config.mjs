import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		boxShadow: {
			none: defaultTheme.boxShadow.none,
			pop: '8px 8px 0 0 rgb(0 0 0)'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			hover: {
				primary: "#ff5938",
				neutral: "#fff0eb",
			},
			active: {
				primary: "#ff4c38",
				neutral: "#ffe0d6",
			},
			gray: "#585858",
		},
		screens: {
			"sm": "640px",
			"md": "768px",
			"lg": "1080px",
			"xl": "1200px",
			"2xl": "1440px",
			"3xl": "1600px",
		},
		extend: {
			borderWidth: {
				'3': '3px',
			},
			borderRadius: {
				'inherit': 'inherit',
			},
			fontFamily: {
				sans: ['Azeret Mono Variable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities, theme, }) => {
			addUtilities({
				'.h1': {
					fontSize: theme('fontSize.5xl'),
					fontWeight: theme('fontWeight.bold'),
					lineHeight: theme('lineHeight.tight'),
				},
				'.h2': {
					fontSize: "32px",
					fontWeight: theme('fontWeight.semibold'),
					lineHeight: theme('lineHeight.normal'),
				},
				'.h3': {
					fontSize: theme('fontSize.2xl'),
					fontWeight: theme('fontWeight.medium'),
					lineHeight: "1.333",
				},
				'.text': {
					fontSize: theme('fontSize.base'),
					fontWeight: theme('fontWeight.semibold'),
					lineHeight: theme('lineHeight.normal'),
				},
				'.p': {
					fontSize: theme('fontSize.base'),
					fontWeight: theme('fontWeight.normal'),
					lineHeight: theme('lineHeight.normal'),
				},
			});
		}),

		require('daisyui'),
		require('@xpd/tailwind-3dtransforms'),
		require('tailwind-scrollbar-hide'),
	],

	daisyui: {
		styled: false,
		logs: false,
		themes: [
			{
				light: {
					"primary": "#ff6d38",
					"primary-content": "#1c1b1f",

					"accent": "#fff0eb",

					"neutral": "#ffffff",
					"neutral-content": "#1c1b1f",

					"base-300": "#1c1b1f",
					"base-content": "#ffffff",

					"info": "#fff0eb",
					"success": "#22bd3e",
					"warning": "#bd9922",
					"error": "#bd2222",

					'--rounded-box': '1.5rem',
					'--rounded-btn': '9999px',
					'--rounded-badge': '2rem',
				},
			},
		],
	},
};
