import { cva, type VariantProps } from 'class-variance-authority';

export const gridVariant = cva(
  ['grid', 'gap-6', 'py-2', 'auto-rows-fr', '*:m-0'],
  {
    variants: {
      columns: {
        two: ['grid-cols-1', 'sm:grid-cols-2'],
        three: ['grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3'],
        four: [
          'grid-cols-1',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'lg:grid-cols-4',
        ],
      },
      border: {
        true: ['*:p-12', 'sm:*:p-4', '*:border-3'],
        false: null,
      },
      background: {
        true: ['*:bg-(--color-layer-2)'],
        false: null,
      },
    },
    defaultVariants: { columns: 'three', border: true, background: true },
  },
);
export type GridProps = VariantProps<typeof gridVariant>;
