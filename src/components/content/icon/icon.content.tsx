import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';

export const iconContent = inline({
  label: 'Icon',
  description: 'Displays an icon of your choice.',
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
        d='M3 6.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M2.5 21h8l-4-7zM14 3l7 7m-7 0l7-7m-7 11h7v7h-7z'
      />
    </svg>
  ),
  ContentView: ({ value }) => <i>Icon: {value.name}</i>,
  schema: {
    name: fields.text({
      label: 'Name',
      defaultValue: 'tabler:error-404',
      validation: { isRequired: true },
    }),
  },
});
