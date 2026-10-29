import { BRAND_NAME } from 'astro:env/client';

export const personSchema = (url: URL) => {
  const site = new URL(import.meta.env.SITE);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.origin}/#person`,
    name: 'Sören Maschmann',
    alternateName: 'Soren Maschmann',
    givenName: 'Sören',
    familyName: 'Maschmann',
    jobTitle: 'Software Engineer & Digital Explorer',
    description:
      'Software engineer & digital explorer - transforming visions into reality, one line of code at a time.',
    url: site.href,
    email: 'mailto:work@soren.codes',
    image: new URL('/favicon.svg', url.origin).href,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teutoburger Str. 99',
      addressLocality: 'Bielefeld',
      addressRegion: 'North Rhine-Westphalia',
      postalCode: '33607',
      addressCountry: 'DE',
    },
    worksFor: {
      '@id': `${site.origin}/#organization`,
    },
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
  };
};

export const organizationSchema = (url: URL) => {
  const site = new URL(import.meta.env.SITE);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.origin}/#organization`,
    name: BRAND_NAME,
    legalName: 'soren.codes - Sören Maschmann',
    url: site.href,
    logo: new URL('/favicon.svg', url.origin).href,
    foundingDate: '2025',
    email: 'work@soren.codes',
    founder: {
      '@type': 'Person',
      name: 'Sören Maschmann',
      url: site.href,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teutoburger Str. 99',
      addressLocality: 'Bielefeld',
      addressRegion: 'North Rhine-Westphalia',
      postalCode: '33607',
      addressCountry: 'DE',
    },
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
  };
};

export const createSchemaMarkup = (url: URL) =>
  JSON.stringify([personSchema(url), organizationSchema(url)]);
