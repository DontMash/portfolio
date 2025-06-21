import type { APIRoute } from 'astro';
import { settingsSchema } from '@/collections/settings';
import settingsContent from '@/content/settings.json';

export const GET: APIRoute = async ({ rewrite, site, url }) => {
  const isValid = site && site.origin === url.origin;
  if (isValid) {
    return rewrite('/404');
  }

  const settings = settingsSchema.safeParse(settingsContent);
  if (!settings.success || !settings.data.llms) {
    return rewrite('/404');
  }

  return new Response(settings.data.llms);
};
