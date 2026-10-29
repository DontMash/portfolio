import { describe, expect, it } from 'bun:test';

import {
  appendVaryAccept,
  parseAccept,
  prefersMarkdown,
  preferredType,
} from '@/negotiation';

describe('parseAccept', () => {
  it('parses simple type', () => {
    expect(parseAccept('text/markdown')).toEqual([
      { type: 'text/markdown', q: 1, specificity: 2 },
    ]);
  });

  it('parses q-values', () => {
    expect(parseAccept('text/html;q=0.5, text/markdown;q=0.9')[1].q).toBe(0.9);
  });

  it('clamps invalid q-values', () => {
    expect(parseAccept('text/html;q=5')[0].q).toBe(1);
    expect(parseAccept('text/html;q=abc')[0].q).toBe(1);
  });

  it('assigns specificity to wildcards', () => {
    const [wildcard, partial, specific] = parseAccept('*/*, text/*, text/html');
    expect(wildcard.specificity).toBe(0);
    expect(partial.specificity).toBe(1);
    expect(specific.specificity).toBe(2);
  });

  it('ignores empty segments', () => {
    expect(parseAccept('')).toEqual([]);
    expect(parseAccept(', ,')).toEqual([]);
  });
});

describe('preferredType', () => {
  it('defaults to html without header', () => {
    expect(preferredType(null)).toBe('text/html');
    expect(preferredType('')).toBe('text/html');
  });

  it('returns markdown when requested', () => {
    expect(preferredType('text/markdown')).toBe('text/markdown');
  });

  it('returns html for browsers', () => {
    expect(
      preferredType(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      ),
    ).toBe('text/html');
  });

  it('respects q-values', () => {
    expect(preferredType('text/html;q=0.1, text/markdown;q=0.9')).toBe(
      'text/markdown',
    );
    expect(preferredType('text/markdown;q=0.1, text/html;q=0.9')).toBe(
      'text/html',
    );
  });

  it('honors explicit q=0 rejection', () => {
    expect(preferredType('text/html, text/markdown;q=0')).toBe('text/html');
    expect(preferredType('text/markdown;q=0, */*;q=1')).toBe('text/html');
  });

  it('breaks ties by client order', () => {
    expect(preferredType('text/markdown, text/html, */*')).toBe(
      'text/markdown',
    );
    expect(preferredType('text/html, text/markdown, */*')).toBe('text/html');
  });

  it('falls back to html for wildcard only', () => {
    expect(preferredType('*/*')).toBe('text/html');
  });
});

describe('prefersMarkdown', () => {
  it('is true for markdown accept', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
    expect(prefersMarkdown('text/html')).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
  });
});

describe('appendVaryAccept', () => {
  it('sets Vary when missing', () => {
    const headers = new Headers();
    appendVaryAccept(headers);
    expect(headers.get('Vary')).toBe('Accept');
  });

  it('appends to existing Vary', () => {
    const headers = new Headers({ Vary: 'Accept-Encoding' });
    appendVaryAccept(headers);
    expect(headers.get('Vary')).toBe('Accept-Encoding, Accept');
  });

  it('does not duplicate Accept', () => {
    const headers = new Headers({ Vary: 'accept' });
    appendVaryAccept(headers);
    expect(headers.get('Vary')).toBe('accept');
  });
});
