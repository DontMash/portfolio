import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import type { Node } from 'unist';

import { BRAND_NAME } from 'astro:env/client';
import { BRAND_DESCRIPTION } from 'astro:env/server';

import { defaultLocale, useTranslation, type LocaleCode } from '@/i18n';
import { getPageId, getPagePath } from '@/collections/page.collection';

type Tree = Node & { children?: Array<Tree> };

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const ENTITY = /&#x?[0-9a-f]+;/gi;

const decodeEntities = (source: string): string => source.replace(ENTITY, '');

// remark-mdx parses imports/exports (mdxjsEsm), JSX elements
// (mdxJsxFlowElement/mdxJsxTextElement) and expressions
// (mdxFlowExpression/mdxTextExpression) into dedicated AST node types —
// but remark-stringify just serializes them right back as source code.
// A plain parse→stringify round-trip therefore keeps JSX tags in the
// output. This transform removes what agent-facing markdown must not
// contain: ESM and expression nodes are dropped entirely, JSX elements
// are unwrapped recursively so their markdown-relevant children survive
// (e.g. the heading inside <Section>…</Section>).
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

const createLinkList = async (
  origin: string,
  locale: string,
): Promise<string> => {
  // page links come from the pages collection (single source of truth):
  // entry ids are `<locale>` or `<locale>/<slug>`, getPagePath turns them
  // into site routes. llms.txt and sitemap.xml are no pages, so they are
  // appended explicitly.
  const t = useTranslation(locale as LocaleCode);
  const pages = await getCollection(
    'pages',
    (entry) => entry.id === locale || entry.id.startsWith(`${locale}/`),
  );
  const links = pages
    .filter((page) => !page.data.seo.noindex)
    .sort((a, b) => a.id.localeCompare(b.id))
    .flatMap((page) => {
      const href = toAbsolute(`/${getPagePath(page.id)}`, origin);
      const entry = `- [${page.data.title}](${href})`;
      // the contact form is a section of the home page, not its own page
      const contact =
        page.id === locale || page.id === `${locale}/index`
          ? `- [${t('footer.nav.content.contact')}](${href}#contact)`
          : undefined;
      return contact ? [entry, contact] : [entry];
    });
  links.push(`- [llms.txt](${toAbsolute('/llms.txt', origin)})`);
  links.push(`- [Sitemap](${toAbsolute('/sitemap.xml', origin)})`);
  return links.join('\n');
};

export const createMarkdownNotFoundResponse = async (
  url: URL,
  locale?: string,
): Promise<Response> => {
  const activeLocale = (locale as LocaleCode | undefined) ?? defaultLocale;
  const t = useTranslation(activeLocale);
  const intro = t('404.markdown.intro')
    .replaceAll('{path}', url.pathname)
    .replaceAll('{brand}', BRAND_NAME);
  const links = await createLinkList(url.origin, activeLocale);
  const body = `# ${t('404.title')}

${intro}

${links}
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
  const navigation = await createLinkList(origin, locale);

  return `${header}\n\n${body}\n\n---\n\n${navigation}\n`;
};
