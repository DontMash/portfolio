import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';

export const kbdContent = inline({
  label: 'Keyboard',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      >
        <path d='M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
        <path d='M10 16v-6a2 2 0 1 1 4 0v6m-4-3h4' />
      </g>
    </svg>
  ),
  schema: {
    key: fields.text({ label: 'Key', validation: { isRequired: true } }),
  },
  ContentView: ({ value }) => <kbd>{value.key}</kbd>,
});
