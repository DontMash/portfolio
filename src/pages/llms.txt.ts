import type { APIRoute } from 'astro';
import { settingsSchema } from '@/collections/settings.singleton';
import settingsContent from '@/content/settings.json';
import { isProductionOrigin } from '@/utils';

export const GET: APIRoute = async ({ rewrite, site, url }) => {
  if (isProductionOrigin(url, site)) {
    return rewrite('/404');
  }

  const settings = settingsSchema.safeParse(settingsContent);
  if (!settings.success || !settings.data.llms) {
    return rewrite('/404');
  }

  return new Response(settings.data.llms);
};
