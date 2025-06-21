import { fields, singleton } from '@keystatic/core';
import { z } from 'astro:schema';

export const settingsSingleton = singleton({
  label: 'Settings',
  path: 'src/content/settings',
  format: 'json',
  schema: {
    llms: fields.mdx.inline({
      label: 'llms.txt',
      description:
        'Used to provide context and specific information to LLMs. If this field contains data, it will be provided at "/llms.txt".',
      options: {
        bold: false,
        italic: false,
        strikethrough: false,
        code: false,
        table: false,
        image: false,
        codeBlock: false,
      },
    }),
  },
});

export const settingsSchema = z.object({
  llms: z.string().optional(),
});
