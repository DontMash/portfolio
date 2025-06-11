import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ base: 'src/content/pages', pattern: ['*.mdx'] }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { pages };
