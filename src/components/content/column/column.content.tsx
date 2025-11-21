import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

export const columnContent = wrapper({
  label: 'Column',
  description: 'Used to layout content in an uneven column structure.',
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
        d='M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm9-1v18'
      />
    </svg>
  ),
  schema: {
    kind: fields.select({
      label: 'Kind',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    }),
  },
});
