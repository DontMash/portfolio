import { z } from 'astro:schema';

export const settingsSchema = z.object({
  robots: z
    .object({
      userAgent: z.string(),
      allow: z.string().array().optional(),
      disallow: z.string().array().optional(),
    })
    .array(),
  llms: z.string().optional(),
});
