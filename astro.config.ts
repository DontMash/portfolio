import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://www.soren.codes',
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    react(),
    mdx(),
    keystatic(),
  ],
  env: {
    schema: {
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
      REPO_OWNER: envField.string({
        context: 'client',
        access: 'public',
      }),
      REPO_NAME: envField.string({
        context: 'client',
        access: 'public',
      }),
    },
  },
  redirects: {
    '/contact': '/#contact',
  },
});
