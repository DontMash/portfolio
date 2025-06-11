import { config, fields, collection } from '@keystatic/core';
import {
  BRAND_LOGO,
  BRAND_NAME,
  REPO_NAME,
  REPO_OWNER,
} from 'astro:env/client';

import {
  accordionContent,
  accordionItem,
} from '@/components/content/accordion';
import { buttonContent } from '@/components/content/button';
import { containerContent } from '@/components/content/container';
import { formContent } from '@/components/content/form';
import { frameContent } from '@/components/content/frame';
import { iconContent } from '@/components/content/icon';
import { sectionContent } from '@/components/content/section';
import { styleContent } from '@/components/content/style';
import { gridContent } from '@/components/content/grid';
import { logomark } from '@/components/logomark';

export default config({
  ui: {
    brand: BRAND_NAME
      ? {
          name: BRAND_NAME,
          mark: () =>
            logomark(BRAND_LOGO ?? '/favicon.svg', `${BRAND_NAME} Logo`),
        }
      : undefined,
    navigation: {
      Content: ['pages'],
    },
  },
  locale: 'en-US',
  storage: import.meta.env.DEV
    ? {
        kind: 'local',
      }
    : {
        kind: 'github',
        repo: {
          owner: REPO_OWNER,
          name: REPO_NAME,
        },
      },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
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
            Form: formContent,
            Frame: frameContent,
            Grid: gridContent,
            Icon: iconContent,
            Section: sectionContent,
            Style: styleContent,
          },
        }),
      },
    }),
  },
});
