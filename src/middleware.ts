import { defineMiddleware } from 'astro:middleware';

import { appendVaryAccept, prefersMarkdown } from '@/negotiation';
import { createMarkdownNotFoundResponse, renderMarkdownPage } from '@/markdown';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, currentLocale } = context;
  const acceptsMarkdown = prefersMarkdown(request.headers.get('Accept'));

  if (acceptsMarkdown) {
    const markdown = await renderMarkdownPage(url.pathname, url.origin);
    if (markdown !== null) {
      const response = new Response(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
        },
      });
      return response;
    }
  }

  const response = await next();

  if (response.status === 404 && acceptsMarkdown) {
    return await createMarkdownNotFoundResponse(url, currentLocale);
  }

  appendVaryAccept(response.headers);
  return response;
});
