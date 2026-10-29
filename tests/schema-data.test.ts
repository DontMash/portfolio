import { describe, expect, it } from 'bun:test';

import {
  createSchemaMarkup,
  organizationSchema,
  personSchema,
} from '@/schema-data';

const url = new URL('https://www.soren.codes/en');

describe('personSchema', () => {
  it('is a Person with name, url and description', () => {
    const schema = personSchema(url);
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toContain('Maschmann');
    expect(schema.url).toBe('https://www.soren.codes/');
    expect(schema.description).toBeTruthy();
    expect(schema.jobTitle).toContain('Software Engineer');
  });

  it('has contactPoint with email', () => {
    const schema = personSchema(url) as Record<string, any>;
    expect(schema.contactPoint['@type']).toBe('ContactPoint');
    expect(schema.contactPoint.email).toBe('work@soren.codes');
    expect(schema.contactPoint.contactType).toBeTruthy();
  });

  it('has postal address', () => {
    const schema = personSchema(url) as Record<string, any>;
    expect(schema.address['@type']).toBe('PostalAddress');
    expect(schema.address.addressLocality).toBe('Bielefeld');
    expect(schema.address.addressCountry).toBe('DE');
  });

  it('has sameAs social profiles', () => {
    const schema = personSchema(url) as Record<string, any>;
    expect(schema.sameAs).toContain('https://github.com/dontmash');
  });
});

describe('organizationSchema', () => {
  it('is an Organization with name and url', () => {
    const schema = organizationSchema(url);
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('soren.codes');
    expect(schema.url).toBe('https://www.soren.codes/');
  });

  it('has contactPoint with email and contactType', () => {
    const schema = organizationSchema(url) as Record<string, any>;
    const contact = schema.contactPoint[0];
    expect(contact['@type']).toBe('ContactPoint');
    expect(contact.email).toBe('work@soren.codes');
    expect(contact.contactType).toBeTruthy();
  });

  it('has address as PostalAddress', () => {
    const schema = organizationSchema(url) as Record<string, any>;
    expect(schema.address['@type']).toBe('PostalAddress');
    expect(schema.address.streetAddress).toBe('Teutoburger Str. 99');
    expect(schema.address.postalCode).toBe('33607');
  });
});

describe('createSchemaMarkup', () => {
  it('produces valid JSON containing Person and Organization', () => {
    const markup = createSchemaMarkup(url);
    const parsed = JSON.parse(markup);
    expect(parsed).toHaveLength(2);
    expect(parsed.map((entry: any) => entry['@type'])).toEqual([
      'Person',
      'Organization',
    ]);
  });
});
