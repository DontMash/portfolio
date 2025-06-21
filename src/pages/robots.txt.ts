import { isProductionOrigin } from '@/utils';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

type PolicyItem = {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
};

export const GET: APIRoute = async ({ site, url }) => {
  const isValid = isProductionOrigin(url, site);
  const pageContent = await getCollection('pages');
  const pages = pageContent.filter((page) => page.data.seo.noindex);

  const policies: Array<PolicyItem> = isValid
    ? [
        {
          userAgent: '*',
          allow: ['/'],
          disallow: pages.map((page) => `/${page.id}`),
        },
      ]
    : [{ userAgent: '*', disallow: ['/'] }];
  const policyContent = policies
    .map((policy) => {
      const userAgent = `User-agent: ${policy.userAgent}`;
      const allow = policy.allow?.map((value) => `Allow: ${value}`).join('\n');
      const disallow = policy.disallow
        ?.map((value) => `Disallow: ${value}`)
        .join('\n');
      return [userAgent, allow, disallow].filter((value) => !!value).join('\n');
    })
    .join('\n');

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
