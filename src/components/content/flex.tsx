import { fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';
import { cva, type VariantProps } from 'class-variance-authority';

export const flex = cva(['flex', 'flex-wrap', 'gap-4'], {
  variants: {
    center: {
      false: null,
      true: ['justify-center'],
    },
  },
});
export type FlexProps = VariantProps<typeof flex>;

export const flexContent = wrapper({
  label: 'Flex',
  description: 'Used to align content.',
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
    center: fields.checkbox({ label: 'Center', defaultValue: false }),
  },
});
