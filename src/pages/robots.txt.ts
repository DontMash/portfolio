import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { settingsSchema } from '@/collections/settings.singleton';
import settingsContent from '@/content/settings.json';
import { isProductionOrigin } from '@/utils';

export type PolicyItem = {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
};

export const GET: APIRoute = async ({ site, url }) => {
  const isValid = isProductionOrigin(url, site);
  const pageContent = await getCollection('pages');
  const pages = pageContent.filter((page) => page.data.seo.noindex);
  const settings = settingsSchema.safeParse(settingsContent);

  const policies: Array<PolicyItem> = isValid
    ? [
        {
          userAgent: '*',
          allow:
            settings.success && settings.data.robots.length ? undefined : ['/'],
          disallow: pages.map((page) => `/${page.id}`),
        },
        ...(settings.success ? settings.data.robots : []),
      ]
    : [{ userAgent: '*', disallow: ['/'] }];
  const policyContent = policies
    .map((policy) => {
      const hasAllowList = policy.allow && policy.allow.length;
      const hasDisallowList = policy.disallow && policy.disallow.length;
      if (!hasAllowList && !hasDisallowList) {
        return undefined;
      }
      
      const userAgent = `User-agent: ${policy.userAgent}`;
      const allow = policy.allow?.map((value) => `Allow: ${value}`).join('\n');
      const disallow = policy.disallow
        ?.map((value) => `Disallow: ${value}`)
        .join('\n');
      return [userAgent, allow, disallow].filter((value) => !!value).join('\n');
    })
    .filter((value) => !!value)
    .join('\n\n');

  const sitemapContent = isValid
    ? `\n\nSitemap: ${new URL('sitemap.xml', url.origin)}`
    : '';
  const content = policyContent + sitemapContent;

  return new Response(
    `${content}

#                               @@@@                "All your base are belong to us"
#                              @@@@@                
#                    @@@@@     @@@@                 
#                  @@@@@@@    @@@@@                 
#                @@@@@@@@    @@@@@@@@               
#               @@@@@@@@     @@@@@@@@@              
#              @@@@@@@@@    @@@@  @@@@@             
#              @@@@@@@@    @@@@    @@@@             
#             @@@@@@@@    @@@@@    @@@@@            
#              @@@@@@     @@@@     @@@@             
#              @@@@@@    @@@@     @@@@@             
#               @@@@    @@@@@    @@@@@              
#                @@     @@@@ @@@@@@@@               
#                      @@@@@@@@@@@@                 
#                     @@@@@@@@@@                    
#                    @@@@@                          
#                    @@@@                           made by soren.codes | Sören Maschmann`,
  );
};
