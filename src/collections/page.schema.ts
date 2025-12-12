import { z } from 'astro:schema';

import { isLocaleCode } from '@/i18n';

export const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  locales: z
    .object({
      locale: z.string().refine((value) => isLocaleCode(value)),
      ref: z.string(),
    })
    .array(),
  seo: z.object({
    openGraph: z.object({
      basic: z.object({
        title: z.string().optional(),
      }),
      image: z.object({
        url: z.string().optional(),
        alt: z.string().optional(),
      }),
      optional: z.object({ description: z.string().optional() }),
    }),
    keywords: z.string().array(),
    noindex: z.boolean().optional(),
  }),
});
