import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

const SITE = 'https://www.soren.codes';
const pageFiles = import.meta.glob('./src/content/pages/**/*.mdx');
const pages = Object.keys(pageFiles).map((pageFile) => {
  const pagePath = pageFile
    .replace('./src/content/pages', '')
    .slice(0, -'.mdx'.length);
  return new URL(pagePath, SITE).href;
});

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap({
      customPages: [...pages],
    }),
    robotsTxt({
      transform: (content) => `${content}
#                               @@@@                "All your base are belong to us"
#                              @@@@@                
#                    @@@@@     @@@@                 
#                  @@@@@@@    @@@@@                 
#                @@@@@@@@    @@@@@@@@               
#               @@@@@@@@     @@@@@@@@@              
#              @@@@@@@@@    @@@@  @@@@@             
#              @@@@@@@@    @@@@    @@@@             
#             @@@@@@@@    @@@@@    @@@@@            
#              @@@@@@     @@@@     @@@@             
#              @@@@@@    @@@@     @@@@@             
#               @@@@    @@@@@    @@@@@              
#                @@     @@@@ @@@@@@@@               
#                      @@@@@@@@@@@@                 
#                     @@@@@@@@@@                    
#                    @@@@@                          
#                    @@@@                           made by soren.codes | Sören Maschmann`,
    }),
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
