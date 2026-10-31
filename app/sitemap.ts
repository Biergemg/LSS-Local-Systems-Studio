import type { MetadataRoute } from 'next';
import { SITE } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/servicios/presencia-digital`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/terminos`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
