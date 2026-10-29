import { getEntry, type CollectionEntry } from 'astro:content';

import { BRAND_NAME } from 'astro:env/client';
import { BRAND_DESCRIPTION } from 'astro:env/server';

import { defaultLocale } from '@/i18n';
import { getPageId } from '@/collections/page.collection';

const JSX_TAG = /<\/?[A-Z][A-Za-z0-9_]*(?:\s[^<>]*)?\/?>/g;
const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const ENTITY = /&#x?[0-9a-f]+;/gi;

export const stripMarkdownComponents = (source: string): string =>
  source.replace(JSX_TAG, '').replace(ENTITY, '');

export const bodyToMarkdown = (source: string): string => {
  const withoutFrontmatter = source.replace(FRONTMATTER, '');
  const stripped = stripMarkdownComponents(withoutFrontmatter);
  const lines = stripped
    .split('\n')
    .filter((line) => !line.startsWith('import '))
    .filter((line) => !line.startsWith('export '));

  const result: Array<string> = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (inCodeBlock) {
      result.push(line);
      continue;
    }
    if (!line.trim()) {
      result.push('');
      continue;
    }
    const dedented = line.replace(/^[ \t]+/, '');
    const heading = /^(#{1,6})[ \t]?(.*)$/.exec(dedented);
    if (heading) {
      result.push(`${heading[1]} ${heading[2].trim()}`.trimEnd());
      continue;
    }
    result.push(dedented);
  }

  return result
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const toAbsolute = (path: string, origin: string) => new URL(path, origin).href;

const createMarkdownResponse = (body: string, status = 200): Response =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });

const createLinkList = (origin: string, locale: string): string => {
  const links = [
    ['Home', `/${locale}`],
    ['About', `/${locale}/about`],
    ['Contact', `/${locale}#contact`],
    ['Imprint', `/${locale}/imprint`],
    ['Privacy Policy', `/${locale}/privacy`],
    ['llms.txt', '/llms.txt'],
    ['Sitemap', '/sitemap.xml'],
  ];
  return links
    .map(([label, path]) => `- [${label}](${toAbsolute(path, origin)})`)
    .join('\n');
};

export const createMarkdownNotFoundResponse = (
  url: URL,
  locale?: string,
): Response => {
  const activeLocale = locale ?? defaultLocale;
  const body = `# 404 - Not Found

The requested page \`${url.pathname}\` could not be found on ${BRAND_NAME}. It may have been moved, renamed, or never existed. Check the sitemap or llms.txt for available pages, or reach out via [work@soren.codes](mailto:work@soren.codes).

${createLinkList(url.origin, activeLocale)}
`;
  return createMarkdownResponse(body, 404);
};

const getPageLocale = (segments: Array<string>): string | undefined =>
  segments.at(0);

const getPageSlug = (segments: Array<string>): string | undefined =>
  segments.length < 2 ? undefined : segments.slice(1).join('/');

export const findPageForPath = async (
  pathname: string,
): Promise<CollectionEntry<'pages'> | null> => {
  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  if (segments.length === 0) return null;

  const id = getPageId(getPageLocale(segments), getPageSlug(segments));
  const page = await getEntry('pages', id);
  return page ?? null;
};

export const renderMarkdownPage = async (
  pathname: string,
  origin: string,
): Promise<string | null> => {
  const page = await findPageForPath(pathname);
  if (!page) return null;

  const locale = page.id.split('/')[0] ?? defaultLocale;
  const description = page.data.description ?? BRAND_DESCRIPTION ?? '';
  const header = `# ${page.data.title}\n\n> ${description}`;
  const body = bodyToMarkdown(page.body ?? '');
  const navigation = createLinkList(origin, locale);

  return `${header}\n\n${body}\n\n---\n\n${navigation}\n`;
};
