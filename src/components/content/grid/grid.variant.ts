import { cva, type VariantProps } from 'class-variance-authority';

export const gridVariant = cva(
  [
    'grid',
    'gap-6',
    'p-2',
    'auto-rows-fr',
    '*:p-4',
    '*:m-0',
    '*:border-3',
    '*:bg-(--color-layer-2)',
  ],
  {
    variants: {
      columns: {
        two: ['grid-cols-2'],
        three: ['grid-cols-2', 'sm:grid-cols-3'],
        four: ['grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-4'],
      },
    },
    defaultVariants: { columns: 'three' },
  },
);
export type GridProps = VariantProps<typeof gridVariant>;
