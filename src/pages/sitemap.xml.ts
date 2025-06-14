import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, rewrite }) => {
  if (!site) {
    return rewrite('/404');
  }

  const pageFiles = import.meta.glob('../content/pages/**/*.mdx');
  const pages = Object.keys(pageFiles).map((pageFile) => {
    return pageFile
      .slice(0, -'.mdx'.length)
      .replace('/index', '')
      .replace('../content/pages', site.origin);
  });
  console.log(pageFiles, pages);

  const content = pages
    .map(
      (page) =>
        `   <url>
        <loc>${page}</loc>
    </url>`,
    )
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
