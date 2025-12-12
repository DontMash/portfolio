import { cva, type VariantProps } from 'class-variance-authority';

export const gridVariant = cva(['grid', 'my-2', 'auto-rows-fr', '*:m-0'], {
  variants: {
    columns: {
      two: ['grid-cols-1', 'md:grid-cols-2'],
      three: ['grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'],
      four: ['grid-cols-1', 'lg:grid-cols-2', 'xl:grid-cols-4'],
    },
    border: {
      true: [
        '*:px-8',
        '*:py-4',
        '*:relative',
        'overflow-hidden',
        'border-3',
        '*:before:absolute',
        '*:before:z-1',
        '*:before:bg-(--color-foreground)',
        '*:before:w-[3px]',
        '*:before:h-screen',
        '*:before:left-[100%]',
        '*:after:absolute',
        '*:after:z-1',
        '*:after:bg-(--color-foreground)',
        '*:after:w-screen',
        '*:after:h-[3px]',
        '*:after:top-[100%]',
      ],
      false: ['gap-6'],
    },
    background: {
      true: ['bg-(--color-layer-2)'],
      false: null,
    },
  },
  defaultVariants: { columns: 'three', border: true, background: true },
});
export type GridProps = VariantProps<typeof gridVariant>;
