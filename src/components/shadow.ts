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
        'hover:translate-x-2',
        'hover:translate-y-2',
        'hover:shadow-none',
        'focus-visible:translate-x-2',
        'focus-visible:translate-y-2',
        'focus-visible:shadow-pop-none',
        'disabled:hover:transform-none',
        'disabled:hover:shadow-pop-md',
      ],
    },
    {
      shadow: 'pop-lg',
      transition: true,
      class: [
        'hover:translate-x-4',
        'hover:translate-y-4',
        'hover:shadow-none',
        'focus-visible:translate-x-4',
        'focus-visible:translate-y-4',
        'focus-visible:shadow-none',
      ],
    },
  ],
  defaultVariants: {
    shadow: 'none',
    transition: false,
  },
});
export type ShadowProps = VariantProps<typeof shadow>;
