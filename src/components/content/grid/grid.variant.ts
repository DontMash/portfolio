import { cva, type VariantProps } from 'class-variance-authority';

export const gridVariant = cva(
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
export type GridProps = VariantProps<typeof gridVariant>;
