import type { MetadataRoute } from 'next';

const BASE = 'https://cleardmv.com';

const STATES = [
  { code: 'nh', name: 'New Hampshire' },
  { code: 'ny', name: 'New York' },
  { code: 'ma', name: 'Massachusetts' },
  { code: 'me', name: 'Maine' },
  { code: 'ri', name: 'Rhode Island' },
  { code: 'ct', name: 'Connecticut' },
  { code: 'vt', name: 'Vermont' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const statePages = STATES.map(({ code }) => ({
    url:              `${BASE}/?state=${code.toUpperCase()}`,
    lastModified:     new Date(),
    changeFrequency:  'weekly' as const,
    priority:         0.8,
  }));

  const chatPages = STATES.map(({ code }) => ({
    url:              `${BASE}/${code}/chat`,
    lastModified:     new Date(),
    changeFrequency:  'monthly' as const,
    priority:         0.6,
  }));

  return [
    {
      url:             BASE,
      lastModified:    new Date(),
      changeFrequency: 'daily',
      priority:        1,
    },
    {
      url:             `${BASE}/privacy`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.3,
    },
    ...statePages,
    ...chatPages,
  ];
}
