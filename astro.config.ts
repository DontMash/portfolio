import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.soren.codes',
  output: 'server',
  adapter: vercel(),
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
    }),
    react(),
    mdx(),
    ...(process.env.KEYSTATIC_SKIP ? [] : [keystatic()]),
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
    '/contact': '/#contact',
  },
});
