import { collection, fields } from '@keystatic/core';
import { PREVIEW_SITE } from 'astro:env/client';
import { z } from 'astro:schema';

import { getLocales } from '@/i18n';

import {
  accordionContent,
  accordionItem,
} from '@/components/content/accordion';
import { buttonContent } from '@/components/content/button';
import { containerContent } from '@/components/content/container';
import { formContent } from '@/components/content/form';
import { frameContent } from '@/components/content/frame';
import { gridContent } from '@/components/content/grid';
import { iconContent } from '@/components/content/icon';
import { sectionContent } from '@/components/content/section';
import { styleContent } from '@/components/content/style';

export const pageCollection = collection({
  label: 'Pages',
  slugField: 'title',
  columns: ['title'],
  previewUrl: import.meta.env.DEV
    ? '/{slug}'
    : new URL(PREVIEW_SITE).origin + '/{slug}',
  path: 'src/content/pages/**',
  entryLayout: 'content',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({
      name: { label: 'Title', validation: { isRequired: true } },
      slug: { label: 'Path' },
    }),
    description: fields.text({ label: 'Description', multiline: true }),
    locales: fields.array(
      fields.object({
        locale: fields.text({
          label: 'Locale',
          validation: {
            isRequired: true,
            length: { min: 2, max: 2 },
            pattern: {
              regex: new RegExp(`^${getLocales().join('|')}$`),
              message: `Locale has to be one of: ${getLocales().join(', ')}`,
            },
          },
        }),
        ref: fields.relationship({
          label: 'Page',
          collection: 'pages',
          validation: { isRequired: true },
        }),
      }),
      {
        label: 'Multilingual',
        description:
          'A list of references to this page in an alternate language.',
        slugField: 'locale',
        itemLabel: ({ fields }) =>
          `${fields.locale.value} - ${fields.ref.value}`,
      },
    ),
    seo: fields.object(
      {
        openGraph: fields.object(
          {
            basic: fields.object(
              {
                title: fields.text({
                  label: 'Title',
                }),
              },
              { label: 'Basic' },
            ),
            optional: fields.object({
              description: fields.text({
                label: 'Description',
                multiline: true,
              }),
            }),
            image: fields.object(
              {
                url: fields.image({
                  label: 'File',
                  directory: 'public/images/content/pages',
                  publicPath: '/images/content/pages/',
                }),
                alt: fields.text({ label: 'Alt', defaultValue: '' }),
              },
              { label: 'Image' },
            ),
          },
          { label: 'OpenGraph' },
        ),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Keywords',
          itemLabel: (props) => props.value,
        }),
        noindex: fields.checkbox({ label: 'No index', defaultValue: false }),
      },
      { label: 'SEO' },
    ),
    content: fields.mdx({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/images/content/pages',
          publicPath: '@/assets/images/content/pages/',
        },
      },
      components: {
        Accordion: accordionContent,
        AccordionItem: accordionItem,
        Button: buttonContent,
        Container: containerContent,
        Form: formContent,
        Frame: frameContent,
        Grid: gridContent,
        Icon: iconContent,
        Section: sectionContent,
        Style: styleContent,
      },
    }),
  },
});

export const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  locales: z
    .object({
      locale: z.string(),
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
