import type { APIRoute } from 'astro';

type PolicyItem = {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
};

export const GET: APIRoute = ({ site, url }) => {
  const isValid = site && site.origin === url.origin;
  const policies: Array<PolicyItem> = isValid
    ? [{ userAgent: '*', allow: ['/'] }]
    : [{ userAgent: '*', disallow: ['/'] }];
  const policyContent = policies
    .map((policy) => {
      const userAgent = `User-agent: ${policy.userAgent}\n`;
      const allow =
        policy.allow?.map((value) => `Allow: ${value}`).join('\n') ?? '';
      const disallow =
        policy.disallow?.map((value) => `Disallow: ${value}`).join('\n') ?? '';
      return userAgent + allow + disallow;
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
