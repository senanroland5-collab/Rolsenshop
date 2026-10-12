import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rolsenshop.com';

  const routes = [
    '',
    '/les-croqs-colombe',
    '/irashop',
    '/privacy',
    '/terms',
    '/cookies',
    '/refunds',
    '/mentions-legales',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/irashop') || route.startsWith('/les-croqs-colombe') ? 0.9 : 0.5,
  }));
}
