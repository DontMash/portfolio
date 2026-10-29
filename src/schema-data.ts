import type {
  Organization,
  Person,
  PostalAddress,
  WithContext,
} from 'schema-dts';

import { BRAND_NAME } from 'astro:env/client';

const ORIGIN = new URL(import.meta.env.SITE).origin;

const postalAddress: WithContext<PostalAddress> = {
  '@context': 'https://schema.org',
  '@type': 'PostalAddress',
  streetAddress: 'Teutoburger Str. 99',
  addressLocality: 'Bielefeld',
  addressRegion: 'North Rhine-Westphalia',
  postalCode: '33607',
  addressCountry: 'DE',
};

export const personSchema = (): WithContext<Person> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${ORIGIN}/#person`,
  name: 'Sören Maschmann',
  alternateName: 'Soren Maschmann',
  givenName: 'Sören',
  familyName: 'Maschmann',
  jobTitle: 'Software Engineer & Digital Explorer',
  description:
    'Software engineer & digital explorer - transforming visions into reality, one line of code at a time.',
  url: ORIGIN,
  email: 'mailto:work@soren.codes',
  image: `${ORIGIN}/favicon.svg`,
  address: postalAddress,
  worksFor: { '@id': `${ORIGIN}/#organization` },
  sameAs: [
    'https://github.com/dontmash',
    'https://www.linkedin.com/in/smaschmann',
    'https://ko-fi.com/smaschmann',
  ],
  knowsAbout: [
    'Software Development',
    'Full-Stack Web Technologies',
    'TypeScript',
    'React',
    'Astro',
    'Node.js',
    'TailwindCSS',
    'Alpine.js',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'business',
    email: 'work@soren.codes',
    availableLanguage: ['en', 'de'],
  },
});

export const organizationSchema = (): WithContext<Organization> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: BRAND_NAME,
  legalName: 'soren.codes - Sören Maschmann',
  url: ORIGIN,
  logo: `${ORIGIN}/favicon.svg`,
  foundingDate: '2025',
  email: 'work@soren.codes',
  founder: {
    '@type': 'Person',
    name: 'Sören Maschmann',
    url: ORIGIN,
  },
  address: postalAddress,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'business',
      email: 'work@soren.codes',
      availableLanguage: ['en', 'de'],
    },
  ],
  sameAs: [
    'https://github.com/dontmash',
    'https://www.linkedin.com/in/smaschmann',
    'https://ko-fi.com/smaschmann',
  ],
  vatID: 'DE452442403',
  areaServed: 'Worldwide',
  knowsLanguage: ['en', 'de'],
});

export const createSchemaMarkup = () =>
  JSON.stringify([personSchema(), organizationSchema()]);
