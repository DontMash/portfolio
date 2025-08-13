import { cva, type VariantProps } from 'class-variance-authority';

export const sectionVariant = {
  base: cva([], {
    variants: {
      x: {
        false: null,
        true: ['px-4', 'sm:px-12'],
      },
      y: {
        false: null,
        true: ['py-12', 'sm:py-24'],
      },
      background: {
        false: null,
        true: 'bg-(--color-muted)',
      },
    },
    defaultVariants: { x: true, y: true, background: false },
  }),
  content: cva([], {
    variants: {
      max: {
        false: null,
        true: ['w-full', 'max-w-screen-md', 'mx-auto'],
      },
    },
    defaultVariants: { max: true },
  }),
};
export type SectionProps = VariantProps<typeof sectionVariant.base> &
  VariantProps<typeof sectionVariant.content>;
