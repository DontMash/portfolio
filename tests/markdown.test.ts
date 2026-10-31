import { describe, expect, it } from 'bun:test';

import { bodyToMarkdown, createMarkdownNotFoundResponse } from '@/markdown';

describe('bodyToMarkdown', () => {
  it('strips frontmatter', async () => {
    const source = '---\ntitle: Test\n---\n# Hello';
    expect(await bodyToMarkdown(source)).toBe('# Hello');
  });

  it('removes JSX component tags but keeps their children', async () => {
    const source = '<Section max>\n# Hello\n</Section>';
    expect(await bodyToMarkdown(source)).toBe('# Hello');
  });

  it('removes self-closing component tags', async () => {
    const source = '<Icon name="tabler:mail" /> text';
    expect(await bodyToMarkdown(source)).toBe('text');
  });

  it('unwraps lowercase inline jsx tags, keeping text content', async () => {
    const source = 'a <b>bold</b> word';
    expect(await bodyToMarkdown(source)).toBe('a bold word');
  });

  it('removes html entities', async () => {
    expect(await bodyToMarkdown('a &#x20; b')).toBe('a   b');
  });

  it('dedents content inside components', async () => {
    const source = '<Section>\n  ## Heading\n\n  Some text.\n</Section>';
    expect(await bodyToMarkdown(source)).toBe('## Heading\n\nSome text.');
  });

  it('normalizes heading spacing', async () => {
    const source = '<Section>\n  ###Heading\n</Section>';
    expect(await bodyToMarkdown(source)).toBe('### Heading');
  });

  it('preserves code blocks verbatim', async () => {
    const source = '```\n  indented code\n```';
    expect(await bodyToMarkdown(source)).toBe('```\n  indented code\n```');
  });

  it('collapses multiple blank lines', async () => {
    const source = 'a\n\n\n\nb';
    expect(await bodyToMarkdown(source)).toBe('a\n\nb');
  });

  it('removes import and export lines', async () => {
    const source = "import x from 'y';\nexport const z = 1;\n# Hello";
    expect(await bodyToMarkdown(source)).toBe('# Hello');
  });

  it('renders homepage-like mdx', async () => {
    const source = `<Section max={false} background={false}>\n  <Grid kind="left">\n    <Container direction="vertical">\n      # Hi, I'm S\u00f8ren\n\n      ## Software engineer & digital explorer\n\n      Transforming visions into reality.\n    </Container>\n  </Grid>\n</Section>`;
    const result = await bodyToMarkdown(source);
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
