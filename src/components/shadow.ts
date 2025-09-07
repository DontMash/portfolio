import { cva, type VariantProps } from 'class-variance-authority';

export const shadow = cva([], {
  variants: {
    shadow: {
      none: ['shadow-none'],
      pop: ['mb-2', 'shadow-pop-md'],
      'pop-lg': ['mb-4', 'shadow-pop-lg'],
    },
    transition: {
      false: null,
      true: ['transition'],
    },
  },
  compoundVariants: [
    {
      shadow: 'pop',
      transition: true,
      class: [
        'not-disabled:hover:translate-x-2',
        'not-disabled:hover:translate-y-2',
        'not-disabled:hover:shadow-none',
        'not-disabled:focus-visible:translate-x-2',
        'not-disabled:focus-visible:translate-y-2',
        'not-disabled:focus-visible:shadow-pop-none',
      ],
    },
    {
      shadow: 'pop-lg',
      transition: true,
      class: [
        'not-disabled:hover:translate-x-4',
        'not-disabled:hover:translate-y-4',
        'not-disabled:hover:shadow-none',
        'not-disabled:focus-visible:translate-x-4',
        'not-disabled:focus-visible:translate-y-4',
        'not-disabled:focus-visible:shadow-none',
      ],
    },
  ],
  defaultVariants: {
    shadow: 'none',
    transition: false,
  },
});
export type ShadowProps = VariantProps<typeof shadow>;
