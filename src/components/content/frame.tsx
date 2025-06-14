import { block } from '@keystatic/core/content-components';
import { cva, cx, type VariantProps } from 'class-variance-authority';

import { shadow as shadowBase, type ShadowProps } from '@/components/shadow';
import { fields } from '@keystatic/core';

const frameBase = cva([], {
  variants: {
    border: {
      false: null,
      true: ['border-3', 'rounded-3xl', 'overflow-hidden'],
    },
  },
  defaultVariants: { border: false },
});
type FrameBaseProps = VariantProps<typeof frameBase>;
export interface FrameProps extends FrameBaseProps, ShadowProps {}
export const frame = (props?: FrameProps) =>
  cx(frameBase(props), shadowBase({ shadow: props?.shadow }));

export const frameContent = block({
  label: 'Frame',
  description: 'Used to add context & visual fidelity to certain content.',
  icon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path
        fill='none'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M4 7h16M4 17h16M7 4v16M17 4v16'
      />
    </svg>
  ),
  ContentView: ({ value }) =>
    value.image.src && (
      <figure style={{ margin: 0 }}>
        <img
          style={{ width: '100%' }}
          src={URL.createObjectURL(
            new Blob([value.image.src?.data], {
              type: `image/${value.image.src.extension}`,
            }),
          )}
          alt={value.image.alt}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  schema: {
    image: fields.object(
      {
        src: fields.image({
          label: 'File',
          validation: { isRequired: true },
          directory: 'src/assets/images/content/pages',
          publicPath: '/src/assets/images/content/pages/',
        }),
        alt: fields.text({ label: 'Alt', validation: { isRequired: true } }),
      },
      { label: 'Image' },
    ),
    caption: fields.text({ label: 'Caption' }),
    border: fields.checkbox({ label: 'Border' }),
    shadow: fields.select({
      label: 'Shadow',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Pop Large', value: 'pop-lg' },
      ],
      defaultValue: 'none',
    }),
    lazy: fields.checkbox({ label: 'Lazy loading', defaultValue: true }),
  },
});
