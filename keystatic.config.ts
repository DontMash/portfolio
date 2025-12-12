import { config } from '@keystatic/core';
import { BRAND_LOGO, BRAND_NAME, REPOSITORY } from 'astro:env/client';

import { pageCollection } from '@/collections/page.collection';
import { navigationSingleton } from '@/collections/navigation.singleton';
import { settingsSingleton } from '@/collections/settings.singleton';
import { logomark } from '@/components/content/logomark.content';

export default config({
  ui: {
    brand: BRAND_NAME
      ? {
          name: BRAND_NAME,
          mark: () =>
            logomark(BRAND_LOGO ?? '/favicon.svg', `${BRAND_NAME} Logo`),
        }
      : undefined,
    navigation: ['pages', 'navigation', 'settings'],
  },
  locale: 'en-US',
  storage: import.meta.env.DEV
    ? {
        kind: 'local',
      }
    : {
        kind: 'github',
        repo: REPOSITORY as `${string}/${string}`,
        branchPrefix: 'preview',
      },
  collections: {
    pages: pageCollection,
  },
  singletons: {
    navigation: navigationSingleton,
    settings: settingsSingleton,
  },
});
