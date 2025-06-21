import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';
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
type ButtonBaseProps = VariantProps<typeof buttonBase>;
export interface ButtonProps
  extends ButtonBaseProps,
    Pick<ShadowProps, 'shadow'> {}
export const button = (props?: ButtonProps) =>
  cx(
    buttonBase(props),
    shadowBase({ shadow: props?.shadow, transition: true }),
  );

export const buttonContent = inline({
  label: 'Button',
  description: 'Used as a more visual link to other content.',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <g
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
      >
        <path d='M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-.5v-2a1.5 1.5 0 0 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12' />
        <path d='M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19q-.468-.718-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.87 1.87 0 0 1 2.28.28L8 13M5 3L4 2m0 5H3m11-4l1-1m0 4h1' />
      </g>
    </svg>
  ),
  ContentView: ({ value }) => (
    <>
      <button style={{ display: 'inline-flex', gap: '1em' }} type='button'>
        {value.icon?.before && <i>Before: {value.icon.before}</i>}{' '}
        {value.text ? <>{value.text}</> : <i>Button</i>}{' '}
        {value.icon?.after && <i>After: {value.icon.after}</i>}
      </button>
    </>
  ),
  schema: {
    href: fields.url({ label: 'URL', validation: { isRequired: true } }),
    target: fields.select({
      label: 'Navigation',
      options: [
        { label: 'New tab', value: '_blank' },
        { label: 'Same tab', value: '' },
      ],
      defaultValue: '',
    }),
    text: fields.text({
      label: 'Text',
    }),
    icon: fields.object(
      {
        before: fields.text({ label: 'Before' }),
        after: fields.text({ label: 'After' }),
      },
      { label: 'Icon' },
    ),
    variants: fields.object({
      intent: fields.select({
        label: 'Intent',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Accent', value: 'accent' },
        ],
        defaultValue: 'primary',
      }),
      size: fields.select({
        label: 'Size',
        options: [
          { label: 'Default', value: 'md' },
          { label: 'Icon', value: 'icon' },
        ],
        defaultValue: 'md',
      }),
      shadow: fields.select({
        label: 'Shadow',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Pop', value: 'pop' },
        ],
        defaultValue: 'none',
      }),
    }),
  },
});
