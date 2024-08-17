import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://vin-decode.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: 'https://vin-decode.com/results',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
  ];
}
