import { defineConfig } from 'astro/config';

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
  redirects: {
    '/contact': '/#contact',
  },
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
});
