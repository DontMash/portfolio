import { fields, singleton } from '@keystatic/core';
import { z } from 'astro:schema';

export const settingsSingleton = singleton({
  label: 'Settings',
  path: 'src/content/settings',
  format: 'json',
  schema: {
    robots: fields.array(
      fields.object({
        userAgent: fields.text({
          label: 'User-Agent',
          description:
            'Defines a user-agent to apply the ruleset to (wildcard characters available).',
          validation: { isRequired: true },
        }),
        allow: fields.array(
          fields.text({
            label: 'Path',
            description:
              'A relative path to the resource (wildcard characters available).',
          }),
          {
            label: 'Allow',
            description: 'Optional list of allowed paths.',
            itemLabel: ({ value }) => value,
          },
        ),
        disallow: fields.array(
          fields.text({
            label: 'Path',
            description:
              'A relative path to the resource (wildcard characters available).',
          }),
          {
            label: 'Disallow',
            description: 'Optional list of disallowed paths.',
          },
        ),
      }),
      {
        label: 'robots.txt',
        description:
          'Used to explicitly allow/disallow crawlers to gather data from your site.',
        slugField: 'userAgent',
        itemLabel: ({ fields }) => fields.userAgent.value,
      },
    ),
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
  robots: z
    .object({
      userAgent: z.string(),
      allow: z.string().array().optional(),
      disallow: z.string().array().optional(),
    })
    .array(),
  llms: z.string().optional(),
});
