import { BRAND_LOGO, BRAND_NAME } from 'astro:env/client';
import { BRAND_DESCRIPTION, BRAND_TWITTER } from 'astro:env/server';
import type { SEOProps as AstroSEOProps } from 'astro-seo';
import _ from 'lodash';

export interface SEOProps
  extends Omit<
    AstroSEOProps,
    | 'charset'
    | 'extend'
    | 'languageAlternates'
    | 'openGraph'
    | 'titleDefault'
    | 'titleTemplate'
    | 'twitter'
  > {
  keywords?: Array<string>;
  openGraph: {
    basic?: {
      title: string;
    };
    image?: {
      url?: string;
      alt?: string;
    };
    optional?: {
      description?: string;
    };
  };
}

export const createSEOProps = (url: URL, props?: SEOProps): AstroSEOProps => {
  const ogTitle = props?.openGraph.basic?.title ?? props?.title ?? BRAND_NAME;
  const ogImageUrl = new URL(
    props?.openGraph.image?.url ?? BRAND_LOGO,
    url.origin,
  ).href;
  const ogImageAlt = props?.openGraph.image?.alt ?? `${BRAND_NAME} logo`;
  const ogDescription =
    props?.openGraph.optional?.description ?? BRAND_DESCRIPTION;

  const site = new URL(import.meta.env.SITE);
  const defaultProps: AstroSEOProps = {
    titleTemplate: `%s | ${BRAND_NAME}`,
    titleDefault: BRAND_NAME,
    description: BRAND_DESCRIPTION,
    noindex: site.origin !== url.origin,
    nofollow: site.origin !== url.origin,
    openGraph: {
      basic: {
        title: ogTitle,
        type: 'website',
        image: ogImageUrl,
      },
      image: {
        url: ogImageUrl,
        alt: ogImageAlt,
      },
      optional: {
        description: ogDescription,
      },
    },
    twitter: {
      card: 'summary',
      site: BRAND_TWITTER,
      creator: BRAND_TWITTER,
      title: ogTitle,
      image: ogImageUrl,
      imageAlt: ogImageAlt,
      description: ogDescription,
    },
    charset: 'UTF-8',
    extend: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'sitemap', href: '/sitemap.xml' },
      ],
      meta: [{ name: 'viewport', content: 'width=device-width' }],
    },
  };

  const result = _.merge(defaultProps, props);
  if (props?.keywords && result.extend?.meta) {
    result.extend.meta = [
      ...result.extend.meta,
      {
        name: 'keywords',
        content: props.keywords.join(', '),
      },
    ];
  }

  return result;
};
