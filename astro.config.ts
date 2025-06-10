import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.soren.codes',
  output: 'server',
  adapter: vercel(),
  integrations: [
    icon({
      iconDir: 'src/assets/icons',
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !/style/.test(page),
    }),
    robotsTxt(),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      EMAIL_USER: envField.string({ context: 'server', access: 'public' }),
      EMAIL_TARGET: envField.string({ context: 'server', access: 'public' }),
    },
  },
  redirects: {
    '/contact': '/#contact',
  },
});
