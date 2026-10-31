import { describe, expect, it } from 'bun:test';

import { appendVaryAccept, prefersMarkdown } from '@/negotiation';

describe('prefersMarkdown', () => {
  it('is true when Accept includes text/markdown', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
    expect(prefersMarkdown('text/markdown, text/html, */*')).toBe(true);
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,text/markdown;q=0.9,*/*;q=0.8',
      ),
    ).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(prefersMarkdown('TEXT/MARKDOWN')).toBe(true);
  });

  it('is false without markdown in Accept', () => {
    expect(prefersMarkdown('text/html')).toBe(false);
    expect(
      prefersMarkdown(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      ),
    ).toBe(false);
    expect(prefersMarkdown('*/*')).toBe(false);
  });

  it('is false for missing or empty header', () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown('')).toBe(false);
  });

  it('does not match other markdown-like types', () => {
    expect(prefersMarkdown('text/markdown-x')).toBe(false);
    expect(prefersMarkdown('application/markdown+xml')).toBe(false);
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
