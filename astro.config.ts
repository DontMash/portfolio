import { defineConfig, envField } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import { defaultLocale, getLocales } from './src/i18n';

export default defineConfig({
  site: 'https://www.soren.codes',
  output: 'server',
  adapter: vercel(),
  integrations: [
    alpinejs({ entrypoint: '@/alpine' }),
    icon({
      iconDir: 'src/assets/icons',
    }),
    ...(process.env.KEYSTATIC_SKIP ? [] : [keystatic()]),
    mdx(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      PREVIEW_SITE: envField.string({
        context: 'client',
        access: 'public',
      }),
      REPO_OWNER: envField.string({
        context: 'client',
        access: 'public',
      }),
      REPO_NAME: envField.string({
        context: 'client',
        access: 'public',
      }),
      KEYSTATIC_SKIP: envField.boolean({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      BRAND_NAME: envField.string({
        context: 'client',
        access: 'public',
      }),
      BRAND_DESCRIPTION: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      BRAND_LOGO: envField.string({
        context: 'client',
        access: 'public',
      }),
      BRAND_TWITTER: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      EMAIL_USER: envField.string({ context: 'server', access: 'public' }),
      EMAIL_TARGET: envField.string({ context: 'server', access: 'public' }),
    },
  },
  redirects: {
    '/contact': '/en/#contact',
    '/en/contact': '/en/#contact',
    '/de/kontakt': '/de/#contact',
  },
  i18n: {
    locales: getLocales().map((value) => value.code),
    defaultLocale,
  },
});
