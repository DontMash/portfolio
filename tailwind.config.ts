/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-xl)',
            wordBreak: 'break-word',
            hyphens: 'auto',
            textWrap: 'wrap',

            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-lead': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-foreground)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': 'var(--color-foreground)',
            '--tw-prose-bullets': 'var(--color-foreground)',
            '--tw-prose-hr': 'var(--color-background)',
            '--tw-prose-quotes': 'var(--color-foreground)',
            '--tw-prose-quote-borders': 'var(--color-foreground)',
            '--tw-prose-captions': 'var(--color-foreground)',
            '--tw-prose-code': 'var(--color-foreground)',
            '--tw-prose-kbd': 'var(--color-primary)',
            '--tw-prose-kbd-shadows': 'var(--color-background)',
            '--tw-prose-pre-code': 'var(--color-foreground)',
            '--tw-prose-pre-bg': 'var(--color-foreground)',
            '--tw-prose-th-borders': 'var(--color-foreground)',
            '--tw-prose-td-borders': 'var(--color-foreground)',
          },
        },
      },
    },
  },
};
