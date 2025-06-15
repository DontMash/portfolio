import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';
import { cva, type VariantProps } from 'class-variance-authority';

export const grid = cva(
  [
    'flex',
    'flex-col',
    'lg:grid',
    'gap-8',
    'sm:gap-16',
    'items-center',
    'lg:items-start',
  ],
  {
    variants: {
      kind: {
        left: ['lg:grid-cols-[4fr_3fr]'],
        right: ['lg:grid-cols-[3fr_4fr]'],
      },
    },
    defaultVariants: { kind: 'left' },
  },
);
export type GridProps = VariantProps<typeof grid>;

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
