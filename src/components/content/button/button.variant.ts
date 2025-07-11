import { cva, cx, type VariantProps } from 'class-variance-authority';

import { shadow as shadowBase, type ShadowProps } from '@/components/shadow';

const buttonBase = cva(
  [
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
  ],
  {
    variants: {
      kind: {
        default: [
          'rounded-full',
          'border-3',
          'no-underline',
          'align-middle',
          'disabled:bg-base-300',
          'disabled:cursor-not-allowed',
        ],
        link: ['hover:underline', 'focus-visible:underline'],
      },
      intent: {
        primary: ['text-(--color-primary-foreground)'],
        accent: ['text-(--color-accent-foreground)'],
        neutral: ['text-(--color-neutral-foreground)'],
      },
      size: {
        md: [],
        icon: ['size-12', 'p-2'],
        'icon-lg': ['size-16', 'p-2'],
      },
      shadow: {
        none: ['shadow-none'],
        pop: [
          'mb-2',
          'shadow-pop-md',
          'hover:translate-x-2',
          'hover:translate-y-2',
          'hover:shadow-pop-none',
          'focus-visible:translate-x-2',
          'focus-visible:translate-y-2',
          'focus-visible:shadow-pop-none',
          'disabled:hover:transform-none',
          'disabled:hover:shadow-pop-md',
        ],
        'pop-lg': [
          'mb-4',
          'shadow-pop-lg',
          'hover:translate-x-4',
          'hover:translate-y-4',
          'hover:shadow-none',
          'focus-visible:translate-x-4',
          'focus-visible:translate-y-4',
          'focus-visible:shadow-none',
        ],
      },
    },
    compoundVariants: [
      {
        kind: 'default',
        intent: 'primary',
        class: [
          'bg-(--color-primary)',
          'hover:bg-(--color-primary-hover)',
          'focus-visible:bg-(--color-primary-hover)',
          'active:bg-(--color-primary-active)',
        ],
      },
      {
        kind: 'default',
        intent: 'accent',
        class: [
          'bg-(--color-accent)',
          'hover:bg-(--color-accent-hover)',
          'focus-visible:bg-(--color-accent-hover)',
          'active:bg-(--color-accent-active)',
        ],
      },
      {
        kind: 'default',
        intent: 'neutral',
        class: [
          'bg-(--color-neutral)',
          'hover:bg-(--color-neutral-hover)',
          'focus-visible:bg-(--color-neutral-hover)',
          'active:bg-(--color-neutral-active)',
        ],
      },

      {
        kind: 'link',
        intent: ['primary', 'accent', 'neutral'],
        class: [
          'hover:text-(--color-primary)',
          'focus-visible:text-(--color-primary)',
          'active:text-(--color-primary-hover)',
        ],
      },

      {
        kind: 'default',
        size: 'md',
        class: ['min-h-12', 'px-5', 'py-2'],
      },
      {
        kind: 'link',
        size: 'md',
        class: ['p-2', '-m-2'],
      },
    ],
    defaultVariants: {
      kind: 'default',
      intent: 'primary',
      size: 'md',
    },
  },
);
type ButtonBaseProps = VariantProps<typeof buttonBase>;
export interface ButtonProps
  extends ButtonBaseProps,
    Pick<ShadowProps, 'shadow'> {}
export const buttonVariant = (props?: ButtonProps) =>
  cx(
    buttonBase(props),
    shadowBase({ shadow: props?.shadow, transition: true }),
  );
