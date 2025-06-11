import { fields } from '@keystatic/core';
import { mark } from '@keystatic/core/content-components';
import { cva, type VariantProps } from 'class-variance-authority';

export const style = cva([], {
  variants: {
    color: {
      primary: 'text-primary',
    },
    typography: {
      none: '',
      'heading-3': 'heading-3',
    },
  },
});
export type StyleProps = VariantProps<typeof style>;

export const styleContent = mark({
  label: 'Style',
  tag: 'span',
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
        d='M4 20h3m7 0h7M6.9 15h6.9m-3.6-8.7L16 20M5 20l6-16h2l7 16'
      />
    </svg>
  ),
  schema: {
    color: fields.select({
      label: 'Color',
      options: [{ label: 'Primary', value: 'primary' }],
      defaultValue: 'primary',
    }),
    typography: fields.select({
      label: 'Typography',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Heading 3', value: 'heading-3' },
      ],
      defaultValue: 'none',
    }),
  },
});
