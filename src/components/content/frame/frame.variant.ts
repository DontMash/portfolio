import { cva, cx, type VariantProps } from 'class-variance-authority';

import { shadow as shadowBase, type ShadowProps } from '@/components/shadow';

const frameBase = cva(['text-(--color-foreground)'], {
  variants: {
    border: {
      false: null,
      true: ['border-3', 'rounded-3xl', 'overflow-hidden'],
    },
  },
  defaultVariants: { border: false },
});
type FrameBaseProps = VariantProps<typeof frameBase>;
export interface FrameProps extends FrameBaseProps, ShadowProps {}
export const frameVariant = (props?: FrameProps) =>
  cx(frameBase(props), shadowBase({ shadow: props?.shadow }));
