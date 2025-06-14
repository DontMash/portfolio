import { config } from '@keystatic/core';
import {
  BRAND_LOGO,
  BRAND_NAME,
  REPO_NAME,
  REPO_OWNER,
} from 'astro:env/client';

import { pageCollection } from '@/collections/page';
import { logomark } from '@/components/logomark';

export default config({
  ui: {
    brand: BRAND_NAME
      ? {
          name: BRAND_NAME,
          mark: () =>
            logomark(BRAND_LOGO ?? '/favicon.svg', `${BRAND_NAME} Logo`),
        }
      : undefined,
    navigation: {
      Content: ['pages'],
    },
  },
  locale: 'en-US',
  storage: import.meta.env.DEV
    ? {
        kind: 'local',
      }
    : {
        kind: 'github',
        repo: {
          owner: REPO_OWNER,
          name: REPO_NAME,
        },
        branchPrefix: 'preview',
      },
  collections: {
    pages: pageCollection,
  },
});
