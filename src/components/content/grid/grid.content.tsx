import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

export const gridContent = wrapper({
  label: 'Grid',
  description: 'Used to layout content in a grid structure.',
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
        d='M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm0 6h16m-8-8v16'
      />
    </svg>
  ),
  schema: {
    columns: fields.select({
      label: 'Columns',
      options: [
        { label: '2', value: 'two' },
        { label: '3', value: 'three' },
        { label: '4', value: 'four' },
      ],
      defaultValue: 'three',
    }),
    border: fields.checkbox({
      label: 'Border',
      defaultValue: true,
    }),
    background: fields.checkbox({
      label: 'Background',
      defaultValue: true,
    }),
  },
});
