import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { pageSchema } from '@/collections/page.schema';

const pages = defineCollection({
  loader: glob({ base: 'src/content/pages', pattern: ['**/*.mdx'] }),
  schema: pageSchema,
});

export const collections = { pages };
