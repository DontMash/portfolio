import { wrapper } from '@keystatic/core/content-components';
import { cva, cx, type VariantProps } from 'class-variance-authority';

import { shadow as shadowBase, type ShadowProps } from '@/components/shadow';
import { fields } from '@keystatic/core';

const frameBase = cva(['border-3', 'rounded-3xl', 'overflow-hidden'], {
  variants: {},
});
type FrameBaseProps = VariantProps<typeof frameBase>;
export interface FrameProps extends FrameBaseProps, ShadowProps {}
export const frame = (props?: FrameProps) =>
  cx(frameBase(props), shadowBase({ shadow: props?.shadow }));

export const frameContent = wrapper({
  label: 'Frame',
  description: 'Used to add context & visual fidelity to certain content.',
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
        d='M4 7h16M4 17h16M7 4v16M17 4v16'
      />
    </svg>
  ),
  schema: {
    caption: fields.text({ label: 'Caption' }),
    shadow: fields.select({
      label: 'Shadow',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Pop Large', value: 'pop-lg' },
      ],
      defaultValue: 'none',
    }),
  },
});
