import { fields } from '@keystatic/core';
import { IconList } from '@tabler/icons-react';
import { block } from '@keystatic/core/content-components';

const accordionItemFields = {
  title: fields.text({
    label: 'Title',
    validation: { isRequired: true },
  }),
  body: fields.array(
    fields.text({
      label: 'Paragraph',
      multiline: true,
      validation: { isRequired: true },
    }),
    {
      label: 'Answer paragraphs',
      description: 'Add one paragraph per item to preserve readable spacing.',
      validation: { length: { min: 1 } },
      itemLabel: ({ value }) => value.slice(0, 60),
    },
  ),
};

export const accordionContent = block({
  label: 'Accordion',
  description: 'Used to provide a set of collapsible texts with titles.',
  icon: <IconList aria-hidden />,
  schema: {
    multiple: fields.checkbox({
      label: 'Multiple',
      defaultValue: false,
      description:
        'Should it be possible to open more than one item at a time?',
    }),
    items: fields.array(fields.object(accordionItemFields), {
      label: 'Items',
      description: 'Add the questions and their answer paragraphs.',
      validation: { length: { min: 1 } },
      itemLabel: ({ fields }) => fields.title.value,
    }),
  },
});
