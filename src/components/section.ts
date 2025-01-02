import { cva } from 'class-variance-authority';

export const section = cva([], {
  variants: {
    x: {
      false: null,
      true: ['px-4', 'sm:px-12'],
    },
    y: {
      false: null,
      true: ['py-12', 'sm:py-24'],
    },
  },
  defaultVariants: { x: true, y: true },
});
