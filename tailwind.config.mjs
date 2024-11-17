import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    borderRadius: {
      inherit: 'inherit',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
      full: '9999px',
    },
    boxShadow: {
      'none': defaultTheme.boxShadow.none,
      'pop-md': '8px 8px 0 0 currentColor',
      'pop-lg': '16px 16px 0 0 currentColor',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',

      primary: {
        DEFAULT: 'hsl(var(--orange-100))',
        'hover': 'hsl(var(--orange-200))',
        'active': 'hsl(var(--orange-300))',
        foreground: 'hsl(var(--base-900))',
      },
      accent: {
        DEFAULT: 'hsl(var(--background))',
        'hover': 'hsl(var(--peach-100))',
        'active': 'hsl(var(--peach-200))',
        foreground: 'hsl(var(--base-900))',
      },
      neutral: {
        DEFAULT: 'hsl(var(--base-900))',
        'hover': 'hsl(var(--base-700))',
        'active': 'hsl(var(--base-600))',
        foreground: 'hsl(var(--base-100))',
      },
      muted: {
        DEFAULT: 'hsl(var(--peach-100))',
        foreground: 'hsl(var(--base-900))',
      },

      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
    },
    fontFamily: {
      sans: ['Azeret Mono Variable', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '4rem',
    },
    lineHeight: {
      none: defaultTheme.lineHeight.none,
      sm: '1.125',
      md: '1.25',
      lg: '1.333',
      xl: '1.5',
    },

    extend: {
      borderWidth: {
        0.75: '0.1875rem',
      },
      outlineWidth: {
        3: '3px',
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: theme('fontSize.base'),
            lineHeight: theme('lineHeight.md'),

            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-lead': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.foreground'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.foreground'),
            '--tw-prose-bullets': theme('colors.foreground'),
            '--tw-prose-hr': theme('colors.foreground'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-quote-borders': theme('colors.foreground'),
            '--tw-prose-captions': theme('colors.foreground'),
            '--tw-prose-code': theme('colors.foreground'),
            '--tw-prose-pre-code': theme('colors.foreground'),
            '--tw-prose-pre-bg': theme('colors.foreground'),
            '--tw-prose-th-borders': theme('colors.foreground'),
            '--tw-prose-td-borders': theme('colors.foreground'),

            '--tw-prose-invert-body': theme('colors.background'),
            '--tw-prose-invert-headings': theme('colors.background'),
            '--tw-prose-invert-lead': theme('colors.background'),
            '--tw-prose-invert-links': theme('colors.background'),
            '--tw-prose-invert-bold': theme('colors.background'),
            '--tw-prose-invert-counters': theme('colors.background'),
            '--tw-prose-invert-bullets': theme('colors.background'),
            '--tw-prose-invert-hr': theme('colors.background'),
            '--tw-prose-invert-quotes': theme('colors.background'),
            '--tw-prose-invert-quote-borders': theme('colors.background'),
            '--tw-prose-invert-captions': theme('colors.background'),
            '--tw-prose-invert-code': theme('colors.background'),
            '--tw-prose-invert-pre-code': theme('colors.background'),
            '--tw-prose-invert-pre-bg': theme('colors.background'),
            '--tw-prose-invert-th-borders': theme('colors.background'),
            '--tw-prose-invert-td-borders': theme('colors.background'),

            'p': {
              color: theme('colors.neutral.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@xpd/tailwind-3dtransforms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
};
