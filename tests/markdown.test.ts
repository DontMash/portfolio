import { describe, expect, it } from 'bun:test';

import {
  bodyToMarkdown,
  createMarkdownNotFoundResponse,
  stripMarkdownComponents,
} from '@/markdown';

describe('stripMarkdownComponents', () => {
  it('removes JSX component tags', () => {
    const source = '<Section max>\n# Hello\n</Section>';
    expect(stripMarkdownComponents(source).trim()).toBe('# Hello');
  });

  it('removes self-closing component tags', () => {
    const source = '<Icon name="tabler:mail" /> text';
    expect(stripMarkdownComponents(source).trim()).toBe('text');
  });

  it('keeps lowercase inline html untouched', () => {
    const source = 'a <b>bold</b> word';
    expect(stripMarkdownComponents(source)).toBe('a <b>bold</b> word');
  });

  it('removes html entities', () => {
    expect(stripMarkdownComponents('a &#x20; b')).toBe('a  b');
  });
});

describe('bodyToMarkdown', () => {
  it('strips frontmatter', () => {
    const source = '---\ntitle: Test\n---\n# Hello';
    expect(bodyToMarkdown(source)).toBe('# Hello');
  });

  it('dedents content inside components', () => {
    const source = '<Section>\n  ## Heading\n\n  Some text.\n</Section>';
    expect(bodyToMarkdown(source)).toBe('## Heading\n\nSome text.');
  });

  it('normalizes heading spacing', () => {
    const source = '<Section>\n  ###Heading\n</Section>';
    expect(bodyToMarkdown(source)).toBe('### Heading');
  });

  it('preserves code blocks verbatim', () => {
    const source = '```\n  indented code\n```';
    expect(bodyToMarkdown(source)).toBe('```\n  indented code\n```');
  });

  it('collapses multiple blank lines', () => {
    const source = 'a\n\n\n\nb';
    expect(bodyToMarkdown(source)).toBe('a\n\nb');
  });

  it('removes import and export lines', () => {
    const source = "import x from 'y';\nexport const z = 1;\n# Hello";
    expect(bodyToMarkdown(source)).toBe('# Hello');
  });

  it('renders homepage-like mdx', () => {
    const source = `<Section max={false} background={false}>\n  <Grid kind="left">\n    <Container direction="vertical">\n      # Hi, I'm S\u00f8ren\n\n      ## Software engineer & digital explorer\n\n      Transforming visions into reality.\n    </Container>\n  </Grid>\n</Section>`;
    const result = bodyToMarkdown(source);
    expect(result).toContain("# Hi, I'm S\u00f8ren");
    expect(result).toContain('## Software engineer & digital explorer');
    expect(result).toContain('Transforming visions into reality.');
    expect(result).not.toContain('<');
  });
});

describe('createMarkdownNotFoundResponse', () => {
  const url = new URL('https://www.soren.codes/__ora-404-probe-4bwj1p0w');

  it('returns 404 status with markdown content type', () => {
    const response = createMarkdownNotFoundResponse(url);
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toBe(
      'text/markdown; charset=utf-8',
    );
  });

  it('contains at least 20 characters of explanation', async () => {
    const body = await createMarkdownNotFoundResponse(url).text();
    expect(body.trim().length).toBeGreaterThanOrEqual(20);
  });

  it('names the missing path', async () => {
    const body = await createMarkdownNotFoundResponse(url).text();
    expect(body).toContain('/__ora-404-probe-4bwj1p0w');
  });

  it('links to llms.txt and sitemap', async () => {
    const body = await createMarkdownNotFoundResponse(url).text();
    expect(body).toContain('https://www.soren.codes/llms.txt');
    expect(body).toContain('https://www.soren.codes/sitemap.xml');
  });

  it('links to home page', async () => {
    const body = await createMarkdownNotFoundResponse(url).text();
    expect(body).toContain('https://www.soren.codes/en');
  });
});
