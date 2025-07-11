import { fields } from '@keystatic/core';
import { inline } from '@keystatic/core/content-components';

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
