import { cva, type VariantProps } from 'class-variance-authority';

export const styleVariant = cva([], {
  variants: {
    color: {
      none: null,
      primary:
        'text-(--color-primary) selection:text-(--color-primary-foreground)',
    },
    typography: {
      none: null,
      'heading-1': 'heading-1',
      'heading-2': 'heading-2',
      'heading-3': 'heading-3',
      'heading-4': 'heading-4',
    },
  },
});
export type StyleProps = VariantProps<typeof styleVariant>;
