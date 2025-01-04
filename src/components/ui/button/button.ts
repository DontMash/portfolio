import { cva, type VariantProps } from 'class-variance-authority';

export type ButtonProps = VariantProps<typeof button>;
export const button = cva(
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
        primary: ['text-primary-foreground'],
        accent: ['text-accent-foreground'],
        neutral: ['text-neutral-foreground'],
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
          'bg-primary',
          'hover:bg-primary-hover',
          'focus-visible:bg-primary-hover',
          'active:bg-primary-active',
        ],
      },
      {
        kind: 'default',
        intent: 'accent',
        class: [
          'bg-accent',
          'hover:bg-accent-hover',
          'focus-visible:bg-accent-hover',
          'active:bg-accent-active',
        ],
      },
      {
        kind: 'default',
        intent: 'neutral',
        class: [
          'bg-neutral',
          'hover:bg-neutral-hover',
          'focus-visible:bg-neutral-hover',
          'active:bg-neutral-active',
        ],
      },

      {
        kind: 'link',
        intent: ['primary', 'accent', 'neutral'],
        class: [
          'hover:text-primary-hover',
          'focus-visible:text-primary-hover',
          'active:text-primary-active',
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
