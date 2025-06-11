import { config, fields, collection } from '@keystatic/core';

import { accordionContent, accordionItem } from '@/components/content/accordion';
import { buttonContent } from '@/components/content/button';
import { containerContent } from '@/components/content/container';
import { formContent } from '@/components/content/form';
import { frameContent } from '@/components/content/frame';
import { iconContent } from '@/components/content/icon';
import { sectionContent } from '@/components/content/section';
import { styleContent } from '@/components/content/style';
import { gridContent } from '@/components/content/grid';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
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
