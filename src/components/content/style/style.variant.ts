import { cva, type VariantProps } from 'class-variance-authority';

export const styleVariant = cva(['not-prose'], {
  variants: {
    color: {
      none: null,
      primary:
        'text-(--color-primary)',
    },
    typography: {
      none: null,
      'heading-1': 'heading-1',
      'heading-2': 'heading-2',
      'heading-3': 'heading-3',
      'heading-4': 'heading-4',
      'heading-5': 'heading-5',
      'heading-6': 'heading-6',
      'paragraph-highlight': 'paragraph-highlight',
    },
  },
  defaultVariants: {
    color: 'none',
    typography: 'none',
  },
});
export type StyleProps = VariantProps<typeof styleVariant>;
