import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';
import { cva, type VariantProps } from 'class-variance-authority';

export const section = {
  base: cva([], {
    variants: {
      x: {
        false: null,
        true: ['px-4', 'sm:px-12'],
      },
      y: {
        false: null,
        true: ['py-12', 'sm:py-24'],
      },
      background: {
        false: null,
        true: 'bg-muted',
      },
    },
    defaultVariants: { x: true, y: true, background: false },
  }),
  content: cva([], {
    variants: {
      max: {
        false: null,
        true: ['w-full', 'max-w-screen-md', 'mx-auto'],
      },
    },
    defaultVariants: { max: false },
  }),
};
export type SectionProps = VariantProps<typeof section.base> &
  VariantProps<typeof section.content>;

export const sectionContent = wrapper({
  label: 'Section',
  description: 'Used to assign & layout content.',
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
        d='M20 20h.01M4 20h.01M8 20h.01M12 20h.01M16 20h.01M20 4h.01M4 4h.01M8 4h.01M12 4h.01M16 4v.01M4 9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z'
      />
    </svg>
  ),
  schema: {
    id: fields.text({ label: 'Id' }),
    max: fields.checkbox({ label: 'Max width', defaultValue: false }),
    background: fields.checkbox({ label: 'Background', defaultValue: false }),
  },
});
