import { cva, cx, type VariantProps } from 'class-variance-authority';

import { shadow as shadowBase, type ShadowProps } from '@/components/shadow';

const base = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    margin: {
      false: ['m-0!'],
    },
  },
});
const frameContent = cva(['text-(--color-foreground)'], {
  variants: {
    border: {
      false: null,
      true: ['border-3', 'overflow-hidden'],
    },
  },
  defaultVariants: { border: false },
});
const content = (props?: FrameProps) =>
  cx(frameContent(props), shadowBase({ shadow: props?.shadow }));
export const frameVariant = {
  base,
  content,
};

type FrameBaseProps = VariantProps<typeof frameVariant.base>;
type FrameContentProps = VariantProps<typeof frameContent>;

export interface FrameProps
  extends FrameBaseProps,
    FrameContentProps,
    ShadowProps {}
