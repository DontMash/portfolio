import { mock } from 'bun:test';

process.env.SITE = 'https://www.soren.codes';

mock.module('astro:env/client', () => ({
  BRAND_NAME: 'soren.codes',
  BRAND_LOGO: '/favicon.svg',
  PREVIEW_SITE: 'https://preview.soren.codes',
  REPOSITORY: 'DontMash/portfolio',
}));

mock.module('astro:env/server', () => ({
  BRAND_DESCRIPTION: 'Software engineer & digital explorer',
  BRAND_TWITTER: undefined,
}));

mock.module('astro:content', () => ({
  getEntry: async () => null,
  getCollection: async () => [],
  render: async () => ({ Content: () => null }),
}));

export {};
