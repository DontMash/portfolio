import { cva, type VariantProps } from 'class-variance-authority';

export const styleVariant = cva([], {
  variants: {
    color: {
      none: null,
      primary: 'text-(--color-primary)',
    },
    typography: {
      none: null,
      'heading-1': 'heading-1',
      'heading-2': 'heading-2',
      'heading-3': 'heading-3',
    },
  },
});
export type StyleProps = VariantProps<typeof styleVariant>;