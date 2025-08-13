import { block } from '@keystatic/core/content-components';
import { fields } from '@keystatic/core';

import { defaultTheme, themes } from '@/theme';

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
  ContentView: ({ value }) => {
    const image = value.images[0];
    return (
      image?.src && (
        <figure style={{ margin: 0 }}>
          <img
            style={{ width: '100%' }}
            src={URL.createObjectURL(
              new Blob([image.src.data], {
                type: `image/${image.src.extension}`,
              }),
            )}
            alt={image.alt}
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    );
  },
  schema: {
    images: fields.array(
      fields.object(
        {
          theme: fields.select({
            label: 'Theme',
            options: themes.map((theme) => ({ label: theme, value: theme })),
            defaultValue: defaultTheme,
          }),
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
      {
        label: 'Images',
        validation: { length: { min: 1, max: themes.length } },
        itemLabel: ({ fields }) =>
          `${fields.theme.value} - ${fields.src.value?.filename} : ${fields.alt.value}`,
      },
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
