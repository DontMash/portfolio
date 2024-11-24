import { cva } from 'class-variance-authority';

export const textMedia = cva(
  ['text-media', 'flex', 'flex-col', 'lg:grid', 'gap-8', 'sm:gap-16'],
  {
    variants: {
      kind: {
        left: ['lg:grid-cols-[4fr,3fr]'],
        right: ['lg:grid-cols-[3fr,4fr]'],
      },
    },
    defaultVariants: {
      kind: 'left',
    },
  }
);
