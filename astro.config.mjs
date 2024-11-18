import { defineConfig } from 'astro/config';

import compress from "astro-compress";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://soren.codes',
  redirects: {
    '/contact': '/#contact',
  },
  integrations: [icon({
    iconDir: 'src/assets/icons',
  }), sitemap(), svelte(), tailwind({ applyBaseStyles: false }), compress()]
});
