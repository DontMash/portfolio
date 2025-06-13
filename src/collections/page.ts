import { collection, fields } from '@keystatic/core';
import { z } from 'astro:schema';

import {
  accordionContent,
  accordionItem,
} from '@/components/content/accordion';
import { buttonContent } from '@/components/content/button';
import { containerContent } from '@/components/content/container';
import { flexContent } from '@/components/content/flex';
import { formContent } from '@/components/content/form';
import { frameContent } from '@/components/content/frame';
import { iconContent } from '@/components/content/icon';
import { sectionContent } from '@/components/content/section';
import { styleContent } from '@/components/content/style';
import { gridContent } from '@/components/content/grid';

export const pageCollection = collection({
  label: 'Pages',
  slugField: 'title',
  path: 'src/content/pages/*',
  entryLayout: 'content',
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    description: fields.text({ label: 'Description', multiline: true }),
    seo: fields.object(
      {
        openGraph: fields.object(
          {
            basic: fields.object(
              {
                title: fields.text({
                  label: 'Title',
                  validation: { isRequired: true },
                }),
              },
              { label: 'Basic' },
            ),
            optional: fields.object({
              description: fields.text({ label: 'Description' }),
            }),
            image: fields.object(
              {
                url: fields.image({
                  label: 'File',
                  directory: 'public/images/pages',
                  publicPath: '/images/pages/',
                }),
                alt: fields.text({ label: 'Alt' }),
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
      },
      { label: 'SEO' },
    ),
    content: fields.mdx({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/images/pages',
          publicPath: '@/assets/images/pages/',
        },
      },
      components: {
        Accordion: accordionContent,
        AccordionItem: accordionItem,
        Button: buttonContent,
        Container: containerContent,
        Flex: flexContent,
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
  seo: z.object({
    keywords: z.string().array(),
    openGraph: z.object({
      basic: z.object({
        title: z.string(),
      }),
      image: z.object({
        url: z.string().default(''),
        alt: z.string().default(''),
      }),
      optional: z.object({ description: z.string().optional() }),
    }),
  }),
});
