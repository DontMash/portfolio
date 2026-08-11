import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { shadow, type ShadowProps } from '@/components/shadow';

const buttonBase = [
  'inline-flex',
  'justify-center',
  'items-center',
  'gap-x-2',
  'paragraph-highlight',
  'transition',
  'focus-visible:outline-current',
  'focus-visible:outline-dashed',
  'focus-visible:outline-3',
  'focus-visible:outline-offset-2',
  'cursor-pointer',
];

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      default: [
        'rounded-full',
        'border-3',
        'no-underline',
        'align-middle',
        'disabled:bg-base-300',
        'disabled:cursor-not-allowed',
        'bg-(--color-primary)',
        'text-(--color-primary-foreground)',
        'hover:bg-(--color-primary-hover)',
        'focus-visible:bg-(--color-primary-hover)',
        'active:bg-(--color-primary-active)',
      ],
      accent: [
        'rounded-full',
        'border-3',
        'no-underline',
        'align-middle',
        'disabled:bg-base-300',
        'disabled:cursor-not-allowed',
        'bg-(--color-accent)',
        'text-(--color-accent-foreground)',
        'hover:bg-(--color-accent-hover)',
        'focus-visible:bg-(--color-accent-hover)',
        'active:bg-(--color-accent-active)',
      ],
      neutral: [
        'rounded-full',
        'border-3',
        'no-underline',
        'align-middle',
        'disabled:bg-base-300',
        'disabled:cursor-not-allowed',
        'bg-(--color-neutral)',
        'text-(--color-neutral-foreground)',
        'hover:bg-(--color-neutral-hover)',
        'focus-visible:bg-(--color-neutral-hover)',
        'active:bg-(--color-neutral-active)',
      ],
      link: [
        'hover:underline',
        'focus-visible:underline',
        'hover:text-(--color-primary)',
        'focus-visible:text-(--color-primary)',
        'active:text-(--color-primary-hover)',
      ],
    },
    size: {
      default: ['min-h-12', 'px-5', 'py-2'],
      md: ['min-h-12', 'px-5', 'py-2'],
      icon: ['size-12', 'p-2'],
      'icon-lg': ['size-16', 'p-2'],
    },
    shadow: {
      none: [],
      pop: [],
      'pop-lg': [],
    },
  },
  compoundVariants: [
    {
      variant: 'link',
      size: ['default', 'md'],
      class: ['p-2', '-m-2'],
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    shadow: 'none',
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export interface ButtonProps extends ButtonVariantProps, ShadowProps {
  kind?: 'default' | 'link';
  intent?: 'primary' | 'accent' | 'neutral';
}

export const buttonVariant = (props?: ButtonProps) =>
  cn(
    buttonVariants({
      variant:
        props?.kind === 'link'
          ? 'link'
          : props?.intent === 'accent'
            ? 'accent'
            : props?.intent === 'neutral'
              ? 'neutral'
              : 'default',
      size: props?.size,
      shadow: props?.shadow,
    }),
    shadow({ shadow: props?.shadow, transition: true }),
  );

function Button({
  className,
  variant = 'default',
  size = 'md',
  shadow: shadowKind = 'none',
  ...props
}: ButtonPrimitive.Props &
  Omit<ButtonVariantProps, 'shadow'> &
  Pick<ShadowProps, 'shadow'>) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(
        buttonVariants({ variant, size, shadow: shadowKind, className }),
        shadow({ shadow: shadowKind, transition: true }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
