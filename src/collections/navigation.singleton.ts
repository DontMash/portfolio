import { fields, singleton } from '@keystatic/core';

import { getLocales } from '@/i18n';

export const navigationSingleton = singleton({
  label: 'Navigation',
  path: 'src/content/navigation',
  entryLayout: 'form',
  format: { data: 'json' },
  schema: {
    header: fields.array(
      fields.object({
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        description: fields.text({ label: 'Description' }),
        locale: fields.text({
          label: 'Locale',
          validation: {
            isRequired: true,
            length: { min: 2, max: 2 },
            pattern: {
              regex: new RegExp(
                `^${getLocales()
                  .map((locale) => locale.code)
                  .join('|')}$`,
              ),
              message: `Locale has to be one of: ${getLocales()
                .map((locale) => locale.code)
                .join(', ')}`,
            },
          },
        }),
        links: fields.array(
          fields.object({
            page: fields.relationship({
              label: 'Page',
              collection: 'pages',
              validation: { isRequired: true },
            }),
            params: fields.text({
              label: 'Parameters',
            }),
          }),
          {
            label: 'Links',
            itemLabel: ({ fields }) => fields.page.value!,
            validation: {
              length: { min: 1 },
            },
          },
        ),
      }),
      {
        label: 'Header',
        itemLabel: ({ fields }) =>
          `${fields.title.value} - ${fields.locale.value}`,
      },
    ),
    footer: fields.array(
      fields.object({
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        locale: fields.text({
          label: 'Locale',
          validation: {
            isRequired: true,
            length: { min: 2, max: 2 },
            pattern: {
              regex: new RegExp(
                `^${getLocales()
                  .map((locale) => locale.code)
                  .join('|')}$`,
              ),
              message: `Locale has to be one of: ${getLocales()
                .map((locale) => locale.code)
                .join(', ')}`,
            },
          },
        }),
        link: fields.object({
          page: fields.relationship({
            label: 'Page',
            collection: 'pages',
            validation: { isRequired: true },
          }),
          params: fields.text({
            label: 'Parameters',
          }),
        }),
      }),
      {
        label: 'Footer',
        itemLabel: ({ fields }) =>
          `${fields.title.value} - ${fields.locale.value}`,
      },
    ),
  },
});
