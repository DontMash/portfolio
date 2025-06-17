import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site, rewrite }) => {
  if (!site) {
    return rewrite('/404');
  }

  const pageContent = await getCollection('pages');
  const pages = pageContent.filter((page) => !page.data.seo.noindex);

  const content = pages
    .map((page) => {
      if (page.data.locales.length < 1) {
        return `   <url>
          <loc>${new URL(page.id, site)}</loc>
    </url>`;
      }

      return `    <url>
        <loc>${new URL(page.id, site)}</loc>
        ${page.data.locales.map(
          (entry) =>
            `<xhtml:link rel="alternate" hreflang="${entry.locale}" href="${new URL(entry.ref.replace('/index', ''), site)}" />`,
        )}
    </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${content}
</urlset>`,
  );
};
