import { cva, type VariantProps } from 'class-variance-authority';

export const containerVariant = cva(['flex', 'flex-wrap'], {
  variants: {
    direction: {
      horizontal: null,
      vertical: ['flex-col'],
    },
    center: {
      false: null,
      true: ['justify-center'],
    },
    spacing: {
      false: null,
      true: ['gap-4'],
    },
  },
  defaultVariants: { center: null },
});
export type ContainerProps = VariantProps<typeof containerVariant>;
