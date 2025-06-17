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

            h1: {
              fontSize: 'var(--text-hero)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--leading-md)',
              marginBottom: '--spacing(8)',
            },
            h2: {
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--leading-lg)',
              marginTop: '--spacing(6)',
              marginBottom: '--spacing(6)',
            },
            h3: {
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--leading-lg)',
              marginTop: '--spacing(4)',
              marginBottom: '--spacing(4)',
            },
            h4: {
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--leading-md)',
              marginTop: '--spacing(2)',
              marginBottom: '--spacing(2)',
            },
            h5: {
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--leading-xl)',
              marginTop: '--spacing(1)',
              marginBottom: '--spacing(1)',
            },
            h6: {
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--leading-xl)',
              marginTop: '--spacing(1)',
              marginBottom: '--spacing(1)',
            },

            p: {
              color: 'var(--color-base-500)',
            },
            mark: {
              backgroundColor: 'var(--color-primary)',
            },
            kbd: {
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-foreground)',
            },

            img: {
              width: '100%',
            },
            hr: {
              borderTopWidth: 'var(--border-3)',
            },

            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-lead': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-foreground)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': 'var(--color-foreground)',
            '--tw-prose-bullets': 'var(--color-foreground)',
            '--tw-prose-hr': 'var(--color-foreground)',
            '--tw-prose-quotes': 'var(--color-foreground)',
            '--tw-prose-quote-borders': 'var(--color-foreground)',
            '--tw-prose-captions': 'var(--color-foreground)',
            '--tw-prose-code': 'var(--color-foreground)',
            '--tw-prose-kbd': 'var(--color-foreground)',
            '--tw-prose-kbd-shadows': 'var(--color-foreground)',
            '--tw-prose-pre-code': 'var(--color-foreground)',
            '--tw-prose-pre-bg': 'var(--color-foreground)',
            '--tw-prose-th-borders': 'var(--color-foreground)',
            '--tw-prose-td-borders': 'var(--color-foreground)',

            '--tw-prose-invert-body': 'var(--color-background)',
            '--tw-prose-invert-headings': 'var(--color-background)',
            '--tw-prose-invert-lead': 'var(--color-background)',
            '--tw-prose-invert-links': 'var(--color-background)',
            '--tw-prose-invert-bold': 'var(--color-background)',
            '--tw-prose-invert-counters': 'var(--color-background)',
            '--tw-prose-invert-bullets': 'var(--color-background)',
            '--tw-prose-invert-hr': 'var(--color-background)',
            '--tw-prose-invert-quotes': 'var(--color-background)',
            '--tw-prose-invert-quote-borders': 'var(--color-background)',
            '--tw-prose-invert-captions': 'var(--color-background)',
            '--tw-prose-invert-code': 'var(--color-background)',
            '--tw-prose-invert-kbd': 'var(--color-background)',
            '--tw-prose-invert-kbd-shadows': 'var(--color-background)',
            '--tw-prose-invert-pre-code': 'var(--color-background)',
            '--tw-prose-invert-pre-bg': 'var(--color-background)',
            '--tw-prose-invert-th-borders': 'var(--color-background)',
            '--tw-prose-invert-td-borders': 'var(--color-background)',
          },
        },
      },
    },
  },
};
