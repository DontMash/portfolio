import defaultTheme from "tailwindcss/defaultTheme";
import tailwindTypography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    boxShadow: {
      none: defaultTheme.boxShadow.none,
      "pop-none": "0px 0px 0 0 currentColor",
      "pop-md": "8px 8px 0 0 currentColor",
      "pop-lg": "16px 16px 0 0 currentColor",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",

      primary: {
        DEFAULT: "hsl(var(--orange-100))",
        hover: "hsl(var(--orange-200))",
        active: "hsl(var(--orange-300))",
        foreground: "hsl(var(--base-900))",
      },
      accent: {
        DEFAULT: "hsl(var(--background))",
        hover: "hsl(var(--peach-100))",
        active: "hsl(var(--peach-200))",
        foreground: "hsl(var(--base-900))",
      },
      neutral: {
        DEFAULT: "hsl(var(--base-900))",
        hover: "hsl(var(--base-700))",
        active: "hsl(var(--base-600))",
        foreground: "hsl(var(--base-100))",
      },
      muted: {
        DEFAULT: "hsl(var(--peach-100))",
        foreground: "hsl(var(--base-900))",
      },
      base: {
        100: "hsl(var(--base-100))",
        200: "hsl(var(--base-200))",
        300: "hsl(var(--base-300))",
        400: "hsl(var(--base-400))",
        500: "hsl(var(--base-500))",
        600: "hsl(var(--base-600))",
        700: "hsl(var(--base-700))",
        800: "hsl(var(--base-800))",
        900: "hsl(var(--base-900))",
      },
    },
    fontFamily: {
      sans: ["Azeret Mono Variable", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "3rem",
      hero: "4rem",
    },
    lineHeight: {
      none: defaultTheme.lineHeight.none,
      sm: "1.125",
      md: "1.25",
      lg: "1.333",
      xl: "1.5",
    },

    extend: {
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        inherit: "inherit",
        full: "9999px",
      },
      outlineWidth: {
        3: "3px",
      },

      // @ts-ignore
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: theme("maxWidth.none"),
            fontSize: theme("fontSize.base"),
            lineHeight: theme("lineHeight.xl"),

            h1: {
              "@apply heading-1": "",
            },
            h2: {
              "@apply heading-2": "",
            },
            h3: {
              "@apply heading-3": "",
            },
            h4: {
              "@apply heading-4": "",
            },
            h5: {
              "@apply heading-5": "",
            },
            h6: {
              "@apply heading-6": "",
            },

            p: {
              "@apply paragraph": "",
            },

            mark: {
              "background-color": theme("colors.primary.DEFAULT"),
            },
            kbd: {
              "@apply bg-foreground text-primary": "",
            },

            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-lead": theme("colors.foreground"),
            "--tw-prose-links": theme("colors.foreground"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.foreground"),
            "--tw-prose-bullets": theme("colors.foreground"),
            "--tw-prose-hr": theme("colors.foreground"),
            "--tw-prose-quotes": theme("colors.foreground"),
            "--tw-prose-quote-borders": theme("colors.foreground"),
            "--tw-prose-captions": theme("colors.foreground"),
            "--tw-prose-code": theme("colors.foreground"),
            "--tw-prose-kbd-shadows": theme("colors.foreground"),
            "--tw-prose-pre-code": theme("colors.foreground"),
            "--tw-prose-pre-bg": theme("colors.foreground"),
            "--tw-prose-th-borders": theme("colors.foreground"),
            "--tw-prose-td-borders": theme("colors.foreground"),

            "--tw-prose-invert-body": theme("colors.background"),
            "--tw-prose-invert-headings": theme("colors.background"),
            "--tw-prose-invert-lead": theme("colors.background"),
            "--tw-prose-invert-links": theme("colors.background"),
            "--tw-prose-invert-bold": theme("colors.background"),
            "--tw-prose-invert-counters": theme("colors.background"),
            "--tw-prose-invert-bullets": theme("colors.background"),
            "--tw-prose-invert-hr": theme("colors.background"),
            "--tw-prose-invert-quotes": theme("colors.background"),
            "--tw-prose-invert-quote-borders": theme("colors.background"),
            "--tw-prose-invert-captions": theme("colors.background"),
            "--tw-prose-invert-code": theme("colors.background"),
            "--tw-prose-invert-kbd-shadows": theme("colors.background"),
            "--tw-prose-invert-pre-code": theme("colors.background"),
            "--tw-prose-invert-pre-bg": theme("colors.background"),
            "--tw-prose-invert-th-borders": theme("colors.background"),
            "--tw-prose-invert-td-borders": theme("colors.background"),
          },
        },
      }),
    },
  },
  plugins: [
    tailwindTypography,
    plugin(({ addComponents, theme }) => {
      addComponents({
        ".paragraph": {
          "@apply text-base lg:text-lg": "",
          lineHeight: theme("lineHeight.xl"),
          color: theme("colors.base.500"),
        },
        ".paragraph-highlight": {
          "@apply text-base lg:text-lg": "",
          lineHeight: theme("lineHeight.xl"),
          fontWeight: theme("fontWeight.semibold"),
        },

        ".heading-6": {
          "@apply text-base lg:text-lg": "",
          lineHeight: theme("lineHeight.xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-5": {
          "@apply text-lg lg:text-xl": "",
          lineHeight: theme("lineHeight.xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-4": {
          "@apply text-xl lg:text-2xl": "",
          lineHeight: theme("lineHeight.md"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-3": {
          "@apply text-2xl lg:text-3xl": "",
          lineHeight: theme("lineHeight.lg"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".heading-2": {
          "@apply text-3xl lg:text-4xl": "",
          lineHeight: theme("lineHeight.xl"),
          fontWeight: theme("fontWeight.semibold"),
        },
        ".heading-1": {
          "@apply text-4xl lg:text-hero": "",
          lineHeight: theme("lineHeight.md"),
          fontWeight: theme("fontWeight.bold"),
        },
        ".hero": {
          "@apply text-4xl lg:text-hero": "",
          lineHeight: theme("lineHeight.none"),
          fontWeight: theme("fontWeight.black"),
        },
      });
    }),
  ],
};
