import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

export const containerContent = wrapper({
  label: 'Container',
  description: 'Used to compose & algin content.',
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
        d='M7 4H3v16h4M17 4h4v16h-4m-9-4h.01M12 16h.01M16 16h.01'
      />
    </svg>
  ),
  schema: {
    direction: fields.select({
      label: 'Direction',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      defaultValue: 'horizontal',
    }),
    center: fields.checkbox({ label: 'Center', defaultValue: false }),
    spacing: fields.checkbox({ label: 'Spacing', defaultValue: false }),
  },
});
