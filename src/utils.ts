export const isProductionOrigin = (url: URL, site?: URL) =>
  site && site.origin === url.origin;
