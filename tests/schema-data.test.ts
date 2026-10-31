import { describe, expect, it } from 'bun:test';
import type {
  ContactPoint,
  Person,
  PostalAddress,
  WithContext,
} from 'schema-dts';

import {
  createSchemaMarkup,
  organizationSchema,
  personSchema,
} from '@/schema-data';

const asPerson = (schema: WithContext<Person>): Record<string, unknown> =>
  schema as unknown as Record<string, unknown>;

describe('personSchema', () => {
  it('is a Person with name, url and description', () => {
    const schema = asPerson(personSchema());
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toContain('Maschmann');
    expect(schema.url).toBe('https://www.soren.codes');
    expect(schema.description).toBeTruthy();
    expect(schema.jobTitle).toContain('Software Engineer');
  });

  it('has contactPoint with email', () => {
    const schema = asPerson(personSchema());
    const contact = schema.contactPoint as WithContext<ContactPoint>;
    expect(contact['@type']).toBe('ContactPoint');
    expect(contact.email).toBe('work@soren.codes');
    expect(contact.contactType).toBeTruthy();
  });

  it('has postal address', () => {
    const schema = asPerson(personSchema());
    const address = schema.address as WithContext<PostalAddress>;
    expect(address['@type']).toBe('PostalAddress');
    expect(address.addressLocality).toBe('Bielefeld');
    expect(address.addressCountry).toBe('DE');
  });

  it('has sameAs social profiles', () => {
    const schema = asPerson(personSchema());
    expect(schema.sameAs).toContain('https://github.com/dontmash');
  });
});

describe('organizationSchema', () => {
  it('is an Organization with name and url', () => {
    const schema = organizationSchema() as unknown as Record<string, unknown>;
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('soren.codes');
    expect(schema.url).toBe('https://www.soren.codes');
  });

  it('has contactPoint with email and contactType', () => {
    const schema = organizationSchema() as unknown as Record<string, unknown>;
    const contact = (
      schema.contactPoint as Array<WithContext<ContactPoint>>
    )[0];
    expect(contact['@type']).toBe('ContactPoint');
    expect(contact.email).toBe('work@soren.codes');
    expect(contact.contactType).toBeTruthy();
  });

  it('has address as PostalAddress', () => {
    const schema = organizationSchema() as unknown as Record<string, unknown>;
    const address = schema.address as WithContext<PostalAddress>;
    expect(address['@type']).toBe('PostalAddress');
    expect(address.streetAddress).toBe('Teutoburger Str. 99');
    expect(address.postalCode).toBe('33607');
  });
});

describe('createSchemaMarkup', () => {
  it('produces valid JSON containing Person and Organization', () => {
    const markup = createSchemaMarkup();
    const parsed = JSON.parse(markup);
    expect(parsed).toHaveLength(2);
    const types = parsed.map(
      (entry: Record<string, unknown>) => entry['@type'],
    );
    expect(types).toEqual(['Person', 'Organization']);
  });
});
