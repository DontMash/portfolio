import { fields } from '@keystatic/core';
import { repeating, wrapper } from '@keystatic/core/content-components';

export const accordionContent = repeating({
  label: 'Accordion',
  description: 'Used to provide a set of collapsible texts with titles.',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M13 5h8m-8 4h5m-5 6h8m-8 4h5M3 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z'
      />
    </svg>
  ),
  schema: {
    multiple: fields.checkbox({
      label: 'Multiple',
      defaultValue: false,
      description:
        'Should it be possible to open more than one item at a time?',
    }),
  },
  children: ['AccordionItem'],
});
export const accordionItem = wrapper({
  label: 'Accordion Item',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M4 15h16M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 15h12'
      />
    </svg>
  ),
  forSpecificLocations: true,
  schema: {
    title: fields.text({
      label: 'Title',
      validation: { isRequired: true },
    }),
  },
});
