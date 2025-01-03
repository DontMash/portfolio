import { defineConfig } from 'astro/config';

import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://soren.codes',
  redirects: {
    '/contact': '/#contact',
  },
  integrations: [icon({
    iconDir: 'src/assets/icons',
  }), tailwind({ applyBaseStyles: false }), sitemap({
    filter: (page) => !/style/.test(page),
  }), robotsTxt()],
});