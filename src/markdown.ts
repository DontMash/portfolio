import { getEntry, type CollectionEntry } from 'astro:content';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import type { Node } from 'unist';

type Tree = Node & { children?: Array<Tree> };

import { BRAND_NAME } from 'astro:env/client';
import { BRAND_DESCRIPTION } from 'astro:env/server';

import { defaultLocale } from '@/i18n';
import { getPageId } from '@/collections/page.collection';

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const ENTITY = /&#x?[0-9a-f]+;/gi;

const decodeEntities = (source: string): string => source.replace(ENTITY, '');

// MDX parses imports/exports (mdxjsEsm) and JSX components
// (mdxJsxFlowElement/mdxJsxTextElement) into dedicated node types.
// Drop the ESM/expression nodes; for JSX elements keep the
// markdown-relevant children so content inside components survives.
const MDX_DROPPED = new Set([
  'mdxjsEsm',
  'mdxFlowExpression',
  'mdxTextExpression',
]);
const MDX_JSX = new Set(['mdxJsxFlowElement', 'mdxJsxTextElement']);

const unwrapMdxNodes = (nodes: Array<Tree>): Array<Tree> =>
  nodes.flatMap((child) => {
    if (MDX_DROPPED.has(child.type)) return [];
    if (MDX_JSX.has(child.type)) {
      return unwrapMdxNodes(child.children ?? []);
    }
    return [child];
  });

const normalizeMdxTree = (node: Tree): void => {
  if (!node.children) return;
  node.children = unwrapMdxNodes(node.children);
  for (const child of node.children) {
    normalizeMdxTree(child);
  }
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMdx)
  .use(() => (tree: Node) => {
    normalizeMdxTree(tree as Tree);
  })
  .use(remarkStringify, { resourceMarker: ':' } as never);

export const bodyToMarkdown = async (source: string): Promise<string> => {
  const withoutFrontmatter = source.replace(FRONTMATTER, '');
  const normalized = withoutFrontmatter
    // drop import/export statements textually: we never want them in
    // the output, and parsing them via acorn is unnecessary work
    .replace(/^(?:import|export)[^\n]*\n?/gm, '')
    // normalize headings like `###Heading` to `### Heading` so remark
    // parses them as headings instead of plain text
    .replace(/^(\s*)(#{1,6})([^\s#])/gm, '$1$2 $3');

  const output = await processor.process(normalized);
  return decodeEntities(String(output))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const toAbsolute = (path: string, origin: string) => new URL(path, origin).href;

const createMarkdownResponse = (body: string, status = 200): Response =>
  new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
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
  const body = await bodyToMarkdown(page.body ?? '');
  const navigation = createLinkList(origin, locale);

  return `${header}\n\n${body}\n\n---\n\n${navigation}\n`;
};
