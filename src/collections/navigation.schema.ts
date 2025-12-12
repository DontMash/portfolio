import { reference } from 'astro:content';
import { z } from 'astro:schema';

import { isLocaleCode } from '@/i18n';

export const navigationSchema = z.object({
  header: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      locale: z.string().refine((value) => isLocaleCode(value)),
      links: z
        .object({ page: reference('pages'), params: z.string().optional() })
        .array(),
    })
    .array(),
  footer: z
    .object({
      title: z.string(),
      locale: z.string().refine((value) => isLocaleCode(value)),
      link: z.object({
        page: reference('pages'),
        params: z.string().optional(),
      }),
    })
    .array(),
});
