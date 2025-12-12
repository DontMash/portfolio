import { cva, type VariantProps } from 'class-variance-authority';

export const containerVariant = cva([], {
  variants: {
    direction: {
      none: null,
      horizontal: ['flex', 'flex-wrap'],
      vertical: ['flex', 'flex-col'],
    },
    center: {
      false: null,
      true: null,
    },
    spacing: {
      false: null,
      true: null,
    },
  },
  compoundVariants: [
    {
      direction: 'none',
      center: true,
      class: ['text-center'],
    },
    {
      direction: ['horizontal', 'vertical'],
      center: true,
      class: ['justify-center'],
    },
    {
      direction: 'none',
      spacing: false,
      class: ['space-y-4'],
    },
    {
      direction: ['horizontal', 'vertical'],
      spacing: true,
      class: ['gap-4'],
    },
  ],
  defaultVariants: { center: null },
});
export type ContainerProps = VariantProps<typeof containerVariant>;
